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
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email and password are required!");
        }

        const user = await getUser({
          email,
          password,
        });

        if (!user) throw new Error("Invalid credentials");

        return {
          id: user.id,
          role: user.role,
          email: user.email,
          fullName: user.fullName,
          avatar_url: user.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.fullName = user.fullName;
        token.avatar_url = user.avatar_url;
      }

      // Manually expire the session when logging out
      if (!token?.expires) {
        token.expires = Date.now();
      }

      return token;
    },
    async session({ session, token }) {
      if (!token) {
        return null;
      }
      session.user = {
        id: token.id,
        role: token.role,
        email: token.email,
        fullName: token.fullName,
        avatar_url: token.avatar_url,
      };
      // }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

export const auth = async () => {
  return await getServerSession(authConfig);
};

export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;
