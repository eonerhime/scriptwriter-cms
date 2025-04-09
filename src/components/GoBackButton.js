import { useRouter } from "next/navigation";

export default function GoBackButton({ children }) {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      // Go back to the previous page if history exists
      window.history.back();
    } else {
      // Fallback to home page if no history
      router.push("/");
    }
  };
  return (
    <button
      onClick={handleGoBack}
      className="cursor-pointer px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
    >
      {children}
    </button>
  );
}
