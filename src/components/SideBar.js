"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

function SideBar() {
  const pathname = usePathname();

  const [isEditOpen, setIsEditOpen] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const editAreas = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Footer", path: "/footer" },
    { name: "Users", path: "/users" },
  ];

  const createAreas = [
    { name: "Portfolio", path: "/create/portfolio" },
    { name: "Gallery", path: "/create/gallery" },
    { name: "Blog", path: "/create/blog" },
    { name: "User", path: "/create/user" },
  ];

  return (
    <div className="w-1/6 mx-8 pt-9 p-4 border-r">
      {/* Content Editing Section */}
      <button
        onClick={() => setIsEditOpen(!isEditOpen)}
        className="flex items-center justify-between w-full text-lg font-semibold mb-2 p-2 bg-primary-200 dark:bg-gray-700 text-primary-50 rounded-md"
      >
        Edit
        {isEditOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isEditOpen && (
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
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Content Creation Section */}
      <button
        onClick={() => setIsCreateOpen(!isCreateOpen)}
        className="flex items-center justify-between w-full text-lg font-semibold mb-2 p-2 bg-primary-200 dark:bg-gray-700 text-primary-50 rounded-md"
      >
        Create
        {isCreateOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isCreateOpen && (
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
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SideBar;
