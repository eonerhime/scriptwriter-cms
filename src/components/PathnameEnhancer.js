"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PathnameEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // Remove any existing active classes
      document.querySelectorAll(".nav-item.active").forEach((item) => {
        item.classList.remove("active");
      });

      // Normalize the pathname for comparison
      const normalizedPath = pathname?.toLowerCase();

      // Add active class to the current path
      if (normalizedPath) {
        // Try exact match first
        let activeItem = document.querySelector(
          `.nav-item[data-path="${normalizedPath}"]`
        );

        // If no exact match, try without trailing slash
        if (!activeItem && normalizedPath.endsWith("/")) {
          activeItem = document.querySelector(
            `.nav-item[data-path="${normalizedPath.slice(0, -1)}"]`
          );
        }

        // If still no match, try with trailing slash
        if (!activeItem && !normalizedPath.endsWith("/")) {
          activeItem = document.querySelector(
            `.nav-item[data-path="${normalizedPath}/"]`
          );
        }

        if (activeItem) {
          activeItem.classList.add("active");
        } else {
          console.log(
            "No matching sidebar item found for path:",
            normalizedPath
          );
        }
      }
    } catch (error) {
      console.error("Error in PathnameEnhancer:", error);
    }
  }, [pathname]);

  return null;
}
