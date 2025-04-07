"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ pendingLabel, children }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="cursor-pointer uppercase font-semibold p-2 rounded-md bg-accent-950 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
