"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/getSupabaseClient";
import { updateUserPassword } from "@/lib/actions";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = getSupabaseClient();

  // Confirm email and decode it
  useEffect(() => {
    // Get email from URL parameters
    const emailParam = searchParams.get("email");

    if (!emailParam) {
      // If no email is provided, redirect back to the reset email page
      router.push("/checkEmail");
      return;
    }

    setEmail(decodeURIComponent(emailParam));
  }, [searchParams, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      // Use Supabase Auth API to reset password
      const { success, data } = await updateUserPassword(email, password);

      if (!success) {
        setError("Error updating your password");
        setSuccess(success);
        setIsLoading(false);
        return;
      }

      setSuccess(success);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-6">
          Password Reset Successful
        </h2>
        <p className="mb-6">Your password has been reset successfully.</p>
        <Link
          href="/login"
          className="text-primary-50 transition-all duration-300 ease-in-out hover:underline underline-offset-8 decoration-accent-950"
        >
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-6">Create New Password</h2>
      <p className="mb-4">Create a new password for {email}</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="border-1 p-4 rounded-sm w-full focus:outline-none focus:ring-1 focus-ring-custom dark:border-primary-950"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="border-1 p-4 rounded-sm w-full focus:outline-none focus:ring-1 focus-ring-custom dark:border-primary-950"
            required
          />
        </div>

        <div className="w-full">
          <div className="flex gap-2 justify-between">
            <Link
              href="/checkEmail"
              className="text-primary-50 transition-all duration-300 ease-in-out hover:underline underline-offset-8 decoration-accent-950"
            >
              &larr; Back
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="text-primary-50 transition-all duration-300 ease-in-out hover:underline underline-offset-8 decoration-accent-950 cursor-pointer"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
