"use client";

import supabase from "./supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // For handling redirects

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
        return;
      }

      setUser(data?.session?.user || null);
      setLoading(false);
    };

    fetchSession();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Sign In function
  async function signIn({ email, password }) {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login failed:", error.message);
      setLoading(false);
      return { error };
    }

    setUser(data.user);
    setLoading(false);
    router.push("/dashboard"); // Redirect after login
    return { user: data.user };
  }

  // Sign Out function
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login"); // Redirect to login after logout
  }

  return { user, loading, signIn, signOut };
}
