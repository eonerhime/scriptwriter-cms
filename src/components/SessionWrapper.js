"use client";

import { useSession } from "next-auth/react";

export default function SessionWrapper() {
  const { data: session } = useSession();

  return (
    <header>
      {session ? (
        <p>Welcome, {session.user.fullName || session.user.email}</p>
      ) : (
        <p>Please log in</p>
      )}
    </header>
  );
}
