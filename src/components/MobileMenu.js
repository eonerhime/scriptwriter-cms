"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const editAreas = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    // { name: "Contact", path: "/contact" },
    { name: "Testimonials", path: "/testimonials" },
    // { name: "Footer", path: "/footer" },
    { name: "Users", path: "/users" },
  ];

  // const createAreas = [
  //   { name: "Portfolio", path: "/create/portfolio" },
  //   { name: "Gallery", path: "/create/gallery" },
  //   { name: "Blog", path: "/create/blog" },
  //   { name: "User", path: "/create/user" },
  // ];

  // Close menu when Escape key is pressed

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="block min-[601px]:hidden">
      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}

      <nav
        className={`absolute top-16 left-0 w-full text-primary-50 z-10  bg-primary-500 text-primary-50 p-6 space-y-4 shadow-md transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden bg-opacity-25`}
      >
        {/* Edit Section */}
        {/* <button
          onClick={() => setIsEditOpen(!isEditOpen)}
          className="flex items-center justify-between w-full text-lg font-semibold p-2 bg-primary-200 dark:bg-gray-700 text-primary-50 rounded-md"
        >
          Edit
          {isEditOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button> */}

        {/* {isEditOpen && ( */}
        <ul className="mb-4">
          {editAreas.map((area) => (
            <li key={area.path} className="mb-2">
              <Link
                href={area.path}
                className={`block px-2 py-1 rounded transition ${
                  pathname === area.path
                    ? "bg-accent-950 text-primary-50"
                    : "hover:bg-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click (Mobile)
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* )} */}

        {/* Create Section */}
        {/* <button
          onClick={() => setIsCreateOpen(!isCreateOpen)}
          className="flex items-center justify-between w-full text-lg font-semibold mb-2 p-2 bg-primary-200 dark:bg-gray-700 text-primary-50 rounded-md"
        >
          Create
          {isCreateOpen ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button> */}

        {/* {isCreateOpen && (
          <ul>
            {createAreas.map((area) => (
              <li key={area.path} className="mb-2">
                <Link
                  href={area.path}
                  className={`block px-2 py-1 rounded transition ${
                    pathname === area.path
                      ? "bg-accent-950 text-primary-50"
                      : "hover:bg-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click (Mobile)
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        )} */}
      </nav>
    </div>
  );
}
