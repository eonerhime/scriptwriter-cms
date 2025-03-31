import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getUser } from "./data-services";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and password are required!");
        }

        const user = await getUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user || !user.email) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id.toString(),
          name: user.name || "User",
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.email) {
        session.user = {
          id: token.sub,
          email: token.email,
          name: token.name,
          role: token.role || "user",
        };
      } else {
        console.error("Invalid session token:", token);
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

export const auth = async () => {
  return await getServerSession(authConfig);
};

export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;
