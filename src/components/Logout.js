"use client";

import { signOut } from "@/lib/auth";
import { MdLogout } from "react-icons/md";

export default function Logout() {
  return (
    <button onClick={signOut}>
      <MdLogout className="h-5 w-5 cursor-pointer" />
    </button>
  );
}
