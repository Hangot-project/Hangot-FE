import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { getRole } from "../utils/jwt/get-role";
import { getUserId } from "../utils/jwt/parse-jwt";

async function getSessionFromCookies() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const grantType = cookieStore.get("grantType")?.value || "Bearer";

  if (accessToken) {
    try {
      const role = getRole(accessToken);
      const userId = getUserId(accessToken);

      const sessionData = {
        id: userId,
        name: userId,
        accessToken,
        grantType,
        role,
        userId,
      };
      return sessionData;
    } catch (error) {
      return null;
    }
  }

  return null;
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
        accessToken: { label: "accessToken", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.accessToken) {
          return null;
        }

        try {
          const role = getRole(credentials.accessToken);
          const userId = getUserId(credentials.accessToken);
          const grantType = "Bearer";

          return {
            id: userId,
            name: userId,
            accessToken: credentials.accessToken,
            grantType,
            role,
            userId,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log("=== JWT Callback ===");
      console.log("trigger:", trigger);
      console.log("user:", user ? "존재" : "없음");
      console.log("token.accessToken:", token.accessToken ? "존재" : "없음");

      if (trigger === "update" && session !== null) {
        const { grantType, accessToken } = session as {
          grantType: string;
          accessToken: string;
        };
        return { ...token, ...user, grantType, accessToken };
      }

      // 쿠키에서 세션 복원
      if (!user && !token.accessToken) {
        const cookieUser = await getSessionFromCookies();
        if (cookieUser) {
          return { ...token, ...cookieUser };
        }
      }

      return { ...token, ...user };
    },

    async session({ session, token }) {
      // 토큰이 없으면 쿠키에서 복원 시도
      if (!token.accessToken) {
        const cookieUser = await getSessionFromCookies();
        if (cookieUser) {
          session.user = cookieUser as any;
          return session;
        }
      }

      session.user = token as any;
      return session;
    },
  },

  events: {
    signOut() {
      cookies().delete("accessToken");
    },
  },

  pages: {
    signIn: "/login",
  },
};
