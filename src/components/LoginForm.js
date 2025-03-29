"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import SpinnerMini from "./SpinnerMini";
import { useEffect, useState } from "react";

function LoginForm() {
  const { loading, signIn } = useAuth();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("pass1234");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      await signIn({ email, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 rounded-lg shadow-md w-full max-w-md h-64 border-[1px] dark:border-primary-500"
      >
        <h2 className="text-xl font-bold mb-4 text-center">User Login</h2>
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
        <button
          type="submit"
          className={`mt-4 cursor-pointer px-4 py-2 rounded w-full transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-accent-950 text-primary-50 hover:bg-primary-500"
          }`}
          disabled={loading}
        >
          {loading ? <SpinnerMini /> : "Login"}
        </button>
      </form>

      <div className="mt-6 text-sm text-center">
        <p className="flex gap-4 justify-center items-center">
          Forgot your password?
          <Link
            href="/"
            className="cursor-pointer hover:underline font-bold hover-text-accent-950"
          >
            Reset Password
          </Link>
        </p>
      </div>
    </>
  );
}

export default LoginForm;
