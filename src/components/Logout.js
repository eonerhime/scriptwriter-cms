"use client";

import { signOut } from "@/lib/auth";
import { MdLogout } from "react-icons/md";
import { refreshSession } from "@/lib/actions/refreshSession";

async function handleLogout() {
  try {
    await signOut({ redirect: true, callbackUrl: "/login" });
    await refreshSession();
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

export default function Logout() {
  return (
    <button onClick={handleLogout}>
      <MdLogout className="h-5 w-5 cursor-pointer" />
    </button>
  );
}
