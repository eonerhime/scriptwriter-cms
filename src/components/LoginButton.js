import SpinnerMini from "./SpinnerMini";

function LoginButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`mt-4 cursor-pointer px-4 py-2 rounded w-full transition ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-accent-950 text-primary-50 hover:bg-primary-500"
      }`}
    >
      {loading ? <SpinnerMini /> : "Login"}
    </button>
  );
}

export default LoginButton;
