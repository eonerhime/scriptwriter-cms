"use client";

import { useLogin } from "@/lib/actions";
import { useAuth } from "@/lib/userAuth";
import Link from "next/link";
import { useState } from "react";
import LoginButton from "./LoginButton";

function LoginForm() {
  const login = useLogin();
  const { loading } = useAuth();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("pass1234");
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const error = await login({ email, password });

    if (error) {
      setErrorMessage(error);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 rounded-lg shadow-md w-full max-w-md h-auto border-[1px] dark:border-primary-500"
      >
        <h2 className="text-xl font-bold mb-4 text-center">User Login</h2>

        {errorMessage && (
          <p className="text-accent-950 text-center mb-4">{errorMessage}</p>
        )}

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
