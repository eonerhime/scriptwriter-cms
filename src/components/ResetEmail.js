"use client";

import { getUserByEmail } from "@/lib/data-services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetEmail() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!email) {
        setError("Email field cannot be empty");
        setIsLoading(false);
        return;
      }
      // Verify email exists in the database
      const { email: verifiedEmail } = await getUserByEmail(email);

      if (!verifiedEmail) {
        setError("Email not found in our records");
        setIsLoading(false);
        return;
      }

      // If email is verified, redirect to the password reset page
      // Encoding email to safely pass it in URL
      const encodedEmail = encodeURIComponent(email);

      router.push(`/passwordReset?email=${encodedEmail}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-6">Reset Your Password</h2>
      <p className="mb-4 text-center">
        Enter your email address to reset your password
      </p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="border-1 p-4 rounded-sm w-full focus:outline-none focus:ring-1 focus-ring-custom dark:border-primary-950"
          required
        />

        <div className="w-full">
          <div className="flex gap-2 justify-between mt-6">
            <Link
              href="/login"
              className="text-primary-50 transition-all duration-300 ease-in-out hover:underline underline-offset-8 decoration-accent-950"
            >
              &larr; Go Back
            </Link>
            <button
              onClick={handleSubmit}
              className="text-primary-50 transition-all duration-300 ease-in-out hover:underline underline-offset-8 decoration-accent-950"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
