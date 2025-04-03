"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function SideBar() {
  const pathname = usePathname();

  const areas = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="w-1/6 ml-8 p-4 border-r">
      <ul className="space-y-8">
        {areas.map((area) => (
          <li key={area.path}>
            <Link
              href={area.path}
              className="hover-text-accent-700 group transition-all duration-300 ease-in-out"
            >
              <span
                className={`${
                  pathname === area.path &&
                  "line-through decoration-accent-950 decoration-1"
                } bg-left-bottom bg-gradient-to-r from-accent-700 to-accent-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out`}
              >
                {area.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
