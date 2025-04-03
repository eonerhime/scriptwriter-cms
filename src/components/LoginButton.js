import SpinnerMini from "./SpinnerMini";

function LoginButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`mt-4 cursor-pointer px-4 py-2 rounded w-full transition bg-accent-950
      text-primary-50 ${loading && "bg-gray-400 cursor-not-allowed"}`}
    >
      {loading ? <SpinnerMini /> : "Login"}
    </button>
  );
}

export default LoginButton;
