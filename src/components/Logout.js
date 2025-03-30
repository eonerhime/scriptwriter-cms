"use client";

import { useLogout } from "@/lib/actions";
import { MdLogout } from "react-icons/md";

export default function Logout() {
  const logout = useLogout();

  return (
    <button onClick={logout}>
      <MdLogout className="h-5 w-5 cursor-pointer" />
    </button>
  );
}
