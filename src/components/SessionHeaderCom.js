"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Logout from "./Logout";

function SessionHeaderCom() {
  const { data: session, status } = useSession();

  if (!session || status !== "authenticated") {
    return null;
  }

  return (
    <>
      {session.user.avatar_url && (
        <Image
          src={session.user.avatar_url}
          width={50}
          height={50}
          alt={session.user.avatar_url}
          referrerPolicy="no-referrer"
          className="rounded-full"
        />
      )}
      <Logout />
    </>
  );
}

export default SessionHeaderCom;
