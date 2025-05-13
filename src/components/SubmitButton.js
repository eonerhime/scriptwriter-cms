"use client";

export default function SubmitButton({
  type,
  role,
  btnStyle,
  isPending,
  pendingLabel,
  children,
}) {
  return (
    <button
      type={type}
      className={`${btnStyle} ${
        isPending || role
          ? "bg-gray-400 text-gray-900 cursor-not-allowed"
          : "bg-accent-950 hover:bg-accent-950 hover:border-primary-50"
      }`}
      disabled={isPending || role}
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
