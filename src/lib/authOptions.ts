import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { LoginResponse, userLogin } from "../api/user";

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
        username: { label: "email", type: "text", placeholder: "아이디" },
        password: { label: "password", type: "password", placeholder: "비밀번호" },
        isAuto: { label: "isAuto" },
      },

      async authorize(credentials, req) {
        const _user = { id: credentials.username, name: credentials.username };

        const response = await userLogin({
          email: credentials.username,
          password: credentials.password,
          //@ts-ignore
          autoLogin: credentials.isAuto,
        });

        const result: LoginResponse = await response.json();

        if (result.success) {
          const user = { ..._user, ...result.result };

          //* refresh token 쿠키 저장
          const apiCookies = response.headers.getSetCookie();
          if (apiCookies && apiCookies.length > 0) {
            apiCookies.forEach((cookie) => {
              const parsedCookie = parse(cookie);
              const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];

              //@ts-ignore
              cookies().set({
                name: cookieName,
                value: cookieValue,
                httpOnly: true,
                maxAge: parseInt(parsedCookie["Max-Age"]),
                path: parsedCookie.path,
                sameSite: "none",
                expires: new Date(parsedCookie.expires),
                secure: true,
              });
            });
          }

          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
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
