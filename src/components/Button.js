export default function Button({
  onClick,
  loading,
  isPending,
  pendingLabel,
  children,
}) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`mt-4 h-12 font-bold rounded w-full transition-colors ${
        loading
          ? "bg-gray-400 text-gray-900 cursor-not-allowed"
          : "cursor-pointer px-4 py-2 bg-accent-950  hover:bg-accent-950 hover:border-primary-50"
      }`}
      disabled={isPending || loading}
    >
      {isPending || loading ? pendingLabel : children}
    </button>
  );
}
