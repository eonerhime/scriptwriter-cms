"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideBarItems({ initialPathname }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  let currentPathname = initialPathname === "home" ? initialPathname : pathname;

  // Check if the pathname is "/blogs/blog" and set it to "/blog"
  if (currentPathname === "/blogs/blog") {
    currentPathname = "/blog";
  }

  if (currentPathname === "/users/users") {
    currentPathname = "/users";
  }

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
    <>
      {(session?.user || status === "authorized") && (
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
      )}
    </>
  );
}
