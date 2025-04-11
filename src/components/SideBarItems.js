"use client";

// import { ChevronDown, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SideBarItems({ editAreas }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(true);
  // const [isCreateOpen, setIsCreateOpen] = useState(false);

  // If not authenticated, don't render the sidebar
  if (!session?.user) {
    return null;
  }

  {
    return (
      <aside className="hidden min-[601px]:flex flex-col w-1/4 border-r mt-8 ml-6 md:ml-12 pr-4">
        {/* Edit Section */}
        {/* <button
          onClick={() => setIsEditOpen(!isEditOpen)}
          className="flex items-center justify-between w-full text-lg font-semibold mb-2 p-2 bg-primary-200 dark:bg-gray-700 text-primary-50 rounded-md"
        >
          Edit
          {isEditOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button> */}

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
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click (Mobile)
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

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
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click (Mobile)
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        )} */}
      </aside>
    );
  }
}
