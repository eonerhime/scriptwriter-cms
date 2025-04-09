"use client";

import { useState } from "react";
import GoBackButton from "./GoBackButton";
import ResetPasswordButton from "./ResetPasswordButton";

export default async function ResetPassword({ email }) {
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mismatch, setMismatch] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!password || !passwordCopy) {
      setError("Enter your new password in both fields!");
      setLoading(false);
      return;
    }

    if (password !== passwordCopy) {
      setMismatch;
      setError("Entered passwords do no match!");
      setLoading(false);
      return;
    }

    // try {
    //   const result = await signIn("credentials", {
    //     redirect: false,
    //     email,
    //     password,
    //   });

    //   await refreshSession();

    //   if (result?.error) {
    //     setError("Invalid email or password");
    //     setLoading(false);
    //     return;
    //   }

    //   router.push("/home");
    // } catch (err) {
    //   console.error("Sign-in error:", err);
    //   setError("An error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 rounded-lg shadow-md w-full max-w-md h-auto border-[1px] dark:border-primary-500"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Password Reset</h2>

        {error && <p className="text-accent-950 text-center mb-4">{error}</p>}

        <label>{email}</label>

        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border-[1px] p-2 mb-2 rounded w-full ${
            mismatch
              ? "border-red-600"
              : "   dark:border-primary-500 focus:outline-none focus:ring-1 focus-ring-custom dark:border-accent-950"
          }`}
          required
        />
        <input
          type="password"
          id="passwordCopy"
          placeholder="Re-enter Password"
          value={passwordCopy}
          onChange={(e) => setPasswordCopy(e.target.value)}
          className={`border-[1px] p-2 mb-2 rounded w-full ${
            mismatch
              ? "border-red-600"
              : "   dark:border-primary-500 focus:outline-none focus:ring-1 focus-ring-custom dark:border-accent-950"
          }`}
          required
        />

        <ResetPasswordButton loading={loading} />
      </form>

      <div className="mt-6"></div>

      <GoBackButton>Go Back</GoBackButton>
    </>
  );
}
