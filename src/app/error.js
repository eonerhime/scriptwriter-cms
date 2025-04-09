// error.js
"use client";

import GoBackButton from "@/components/GoBackButton";
import { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures we only run browser APIs on the client side
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h1>
      <p className="text-lg mb-6">We apologize for the inconvenience.</p>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Go back button */}
        {isClient && <GoBackButton>Go Back</GoBackButton>}

        {/* Reset button */}
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
