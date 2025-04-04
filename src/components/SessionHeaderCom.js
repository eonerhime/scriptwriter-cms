"use client";

import Image from "next/image";
import DarkModeSwitch from "./DarkModeSwtch";
import Logout from "./Logout";
import { useSession } from "next-auth/react";

function SessionHeaderCom() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center gap-4">
      <DarkModeSwitch />
      {session?.user?.avatar_url && (
        <Image
          src={session.user.avatar_url}
          width={50}
          height={50}
          alt={session.user.avatar_url}
          referrerPolicy="no-referrer"
          className="rounded-full"
        />
      )}
      {session?.user ? <Logout /> : null}
    </div>
  );
}

export default SessionHeaderCom;
