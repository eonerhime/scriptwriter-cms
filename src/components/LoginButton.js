import SpinnerMini from "./SpinnerMini";

function LoginButton({ loading }) {
  return (
    <button
      type="submit"
      className={`${
        loading
          ? "bg-gray-400 text-gray-900 cursor-not-allowed"
          : "mt-4 font-bold cursor-pointer px-4 py-2 rounded w-full transition bg-accent-950 hover:bg-accent-950 hover:border-primary-50"
      }`}
      disabled={loading}
    >
      {loading ? <SpinnerMini /> : "Login"}
    </button>
  );
}

export default LoginButton;
