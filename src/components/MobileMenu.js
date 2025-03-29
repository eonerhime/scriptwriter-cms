"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        className={`absolute top-16 left-0 w-11/12 text-primary-50 z-10 font-semibold  transparent-bg-primary-500 text-primary-50 p-6 space-y-4 shadow-md transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden bg-opacity-25`}
      >
        <ul className="grid grid-cols-2 items-start gap-6">
          <li>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-accent-700 group  transition-all duration-300 ease-in-out"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-accent-700 to-accent-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="hover:text-accent-700 group  transition-all duration-300 ease-in-out"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-accent-700 to-accent-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                About
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/services"
              onClick={() => setMenuOpen(false)}
              className="hover:text-accent-700 group transition-all duration-300 ease-in-out"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-accent-700 to-accent-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Services
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              onClick={() => setMenuOpen(false)}
              className="hover:text-accent-700 group  transition-all duration-300 ease-in-out"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-accent-700 to-accent-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Gallery
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio"
              onClick={() => setMenuOpen(false)}
              className="hover:text-accent-700 group  transition-all duration-300 ease-in-out"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-accent-700 to-accent-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Portfolio
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="hover:text-accent-700 group  transition-all duration-300 ease-in-out"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-accent-700 to-accent-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Blog
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-accent-700 group  transition-all duration-300 ease-in-out"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-accent-700 to-accent-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Contact
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
