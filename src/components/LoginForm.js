"use client";

import { refreshSession } from "@/actions/refreshSession";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
// import { useSession } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("ifeoma.onerhime@gmail.com");
  const [password, setPassword] = useState("asdf123*");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const { status } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/home");
  //   } else if (status !== "authenticated") {
  //     router.push("/login");
  //   }
  // }, [status, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required!");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      await refreshSession();

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      router.push("/home");
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 rounded-lg shadow-md w-full max-w-md h-auto border-[1px] dark:border-primary-500"
      >
        <h2 className="text-xl font-bold mb-4 text-center">User Login</h2>

        {error && <p className="text-accent-950 text-center mb-4">{error}</p>}

        <input
          type="email"
          id="email"
          autoComplete="username"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-[1px] p-2 mb-2 rounded w-full dark:border-primary-500 focus:outline-none focus:ring-1 focus-ring-custom dark:border-accent-950"
          required
        />
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-[1px] p-2 mb-2 rounded w-full dark:border-primary-500 focus:outline-none focus:ring-1 focus-ring-custom dark:border-accent-950"
          required
        />

        <LoginButton loading={loading} />
      </form>

      <div className="mt-6 text-sm text-center">
        <p className="flex gap-4 justify-center items-center">
          Forgot your password?
          <Link
            href="/passwordReset"
            className="cursor-pointer hover:underline font-bold hover-text-accent-950"
          >
            Reset Password
          </Link>
        </p>
      </div>
    </>
  );
}
