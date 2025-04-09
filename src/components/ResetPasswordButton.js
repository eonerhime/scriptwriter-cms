import SpinnerMini from "./SpinnerMini";

export default function ResetPasswordButton({ loading }) {
  return (
    <button
      type="submit"
      className={`mt-4 font-bold cursor-pointer px-4 py-2 rounded w-full transition bg-accent-950 hover:bg-accent-950 hover:border-primary-50
         ${loading && "bg-gray-400 text-gray-900 cursor-not-allowed"}`}
      disabled={loading}
    >
      {loading ? <SpinnerMini /> : "Reset Password"}
    </button>
  );
}
