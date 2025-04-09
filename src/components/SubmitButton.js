"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ pendingLabel, children }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`cursor-pointer uppercase font-semibold p-2 rounded-md 
        ${
          pending
            ? "disabled-bg-gray-400 disabled-text-gray-700 cursor-not-allowed"
            : "bg-accent-950 text-gray-900 hover:bg-accent-900"
        } transition-colors`}
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
