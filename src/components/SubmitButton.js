"use client";

export default function SubmitButton({ isPending, pendingLabel, children }) {
  return (
    <button
      className={`cursor-pointer uppercase font-semibold p-2 rounded-md 
        ${
          isPending
            ? "disabled-bg-gray-400 disabled-text-gray-700 cursor-not-allowed"
            : "bg-accent-950 hover:bg-accent-950"
        } transition-colors`}
      disabled={isPending}
    >
      {isPending ? pendingLabel : children}
    </button>
  );
}
