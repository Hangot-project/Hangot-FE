import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { LoginResponse, Provider, socialLogin, userLogin } from "../api/user";

function setCookie(response: Response) {
  const apiCookies = response.headers.getSetCookie();
  if (apiCookies && apiCookies.length > 0) {
    apiCookies.forEach((cookie) => {
      const parsedCookie = parse(cookie);
      const [cookieName, cookieValue] = Object.entries(parsedCookie)[0] as string[];

      //@ts-ignore
      cookies().set({
        name: cookieName,
        value: cookieValue,
        httpOnly: cookie.includes("HttpOnly;"),
        path: parsedCookie.Path,
        sameSite: parsedCookie.SameSite,
        secure: true,
        domain: parsedCookie.Domain,
      });
    });
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },

  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        provider: { label: "isSocial" },
        code: { label: "code" },
        username: { label: "email", type: "text", placeholder: "아이디" },
        password: { label: "password", type: "password", placeholder: "비밀번호" },
        isAuto: { label: "isAuto" },
      },

      async authorize(credentials, req) {
        const _user = { id: credentials.username, name: credentials.username };

        // * 소셜 로그인
        if (credentials.provider) {
          //@ts-ignore
          if (!Object.values(Provider).includes(credentials.provider)) {
            throw new Error("지원하지 않는 소셜 로그인");
          }
          //@ts-ignore
          const response = await socialLogin(credentials.provider, {
            code: credentials.code,
          });

          const result: LoginResponse = await response.json();

          if (result.success) {
            setCookie(response);
            return {
              ..._user,
              ...result.result,
            };
          } else {
            return null;
          }
        }

        // * 일반 로그인
        const response = await userLogin({
          email: credentials.username,
          password: credentials.password,
          //@ts-ignore
          autoLogin: credentials.isAuto,
        });

        const result: LoginResponse = await response.json();

        if (result.success) {
          const user = { ..._user, ...result.result };
          setCookie(response);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session !== null) {
        const { grantType, accessToken } = session as {
          grantType: string;
          accessToken: string;
        };
        return { ...token, ...user, grantType, accessToken };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  events: {
    signOut() {
      cookies().delete("refreshToken");
    },
  },

  pages: {
    signIn: "/login",
    newUser: "/sign-up",
  },
};
