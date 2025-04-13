"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideBarItems({ initialPathname }) {
  const pathname = usePathname();
  let currentPathname = initialPathname === "home" ? initialPathname : pathname;

  if (currentPathname === "/blogs/blog") {
    currentPathname = "/blog";
  }

  console.log("Current Pathname:", currentPathname);

  const editAreas = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Users", path: "/users" },
  ];

  return (
    <div className="hidden min-[601px]:flex flex-col border-r mt-8 ml-6 md:ml-12 pr-4">
      <ul className="mb-4">
        {editAreas.map((area) => (
          <li key={area.path} className="mb-2">
            <Link
              href={area.path}
              className={`block px-2 py-1 rounded transition-colors duration-200 
                ${currentPathname === area.path && "active"}
              `}
            >
              {area.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
${pathname === area.path
                  ? "bg-accent-950 text-primary-50"
                  : "hover:bg-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-700"
              }`}
*/
