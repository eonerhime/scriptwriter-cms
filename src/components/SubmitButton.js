"use client";

import Button from "./Button";

export default function SubmitButton({
  type,
  btnStyle,
  isPending,
  pendingLabel,
  children,
}) {
  return (
    <button
      type={type}
      className={`${btnStyle} ${
        isPending ? "bg-gray-400 text-gray-900 cursor-not-allowed" : ""
      }`}
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-2">
          <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
          {pendingLabel}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
