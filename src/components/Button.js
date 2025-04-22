export default function Button({
  type,
  onClick,
  btnStyle,
  loading,
  isPending,
  pendingLabel,
  children,
}) {
  return (
    <button
      type={type}
      // onClick={onClick}
      className={`${btnStyle} ${
        loading || isPending
          ? "bg-gray-400 text-gray-900 cursor-not-allowed"
          : ""
      }`}
      disabled={isPending || loading}
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

//mt-4 h-12 font-bold rounded w-full transition-colors cursor-pointer px-4 py-2 bg-accent-950  hover:bg-accent-950 hover:border-primary-50
