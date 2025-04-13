"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mt-2 mb-4 px-4 py-2 bg-accent-950 text-primary-50 dark:bg-accent-950 rounded"
    >
      Go Back
    </button>
  );
}
