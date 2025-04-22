"use client";

export default function ResetPasswordButton({
  type,
  btnStyle,
  loading,
  pendingLabel,
  children,
}) {
  return (
    <button
      type={type}
      className={`${btnStyle} ${
        loading ? "bg-gray-400 text-gray-900 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      {loading ? (
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
