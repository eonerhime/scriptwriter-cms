"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationClient() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-5 items-center">
      {[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Gallery", path: "/gallery" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
      ].map(({ name, path }) => (
        <li key={path}>
          <Link
            href={path}
            className="hover-text-accent-700 group transition-all duration-300 ease-in-out"
          >
            <span
              className={`${
                pathname === path &&
                "line-through decoration-accent-950 decoration-1"
              } bg-left-bottom bg-gradient-to-r from-accent-700 to-accent-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out`}
            >
              {name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
