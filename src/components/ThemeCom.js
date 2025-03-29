"use client";

import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="dark:text-gray-200 dark:bg-gray-700 min-h-screen select-none transition-colors duration-300 px-8">
        {children}
      </div>
    </ThemeProvider>
  );
}
