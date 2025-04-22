import NextAuth, { getServerSession } from "next-auth";
import { authConfig } from "./auth-config";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";

// Create the NextAuth handler
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

// Server-only function - only use this in server components or API routes
export async function auth() {
  return await getServerSession(authConfig);
}

// Client-side exports
export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;
