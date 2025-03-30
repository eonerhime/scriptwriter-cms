"use client";

import { useAuth } from "./userAuth";

export function useLogin() {
  const { signIn } = useAuth();

  return async ({ email, password }) => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required!");
      }

      const result = await signIn({ email, password });

      if (result?.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      return error.message;
    }
  };
}

export function useLogout() {
  const { signOut } = useAuth();

  return async () => {
    await signOut();
  };
}
