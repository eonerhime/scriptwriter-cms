"use client";

import Image from "next/image";
import DarkModeSwitch from "./DarkModeSwtch";
import Logout from "./Logout";
import { useSession } from "next-auth/react";

function SessionHeaderCom() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-center items-center gap-8">
      {session?.user?.avatar_url && (
        <Image
          src={session.user.avatar_url}
          width={30}
          height={30}
          alt={session.user.avatar_url}
          referrerPolicy="no-referrer"
          className="rounded-full"
        />
      )}
      <DarkModeSwitch />
      {session?.user ? <Logout /> : null}
    </div>
  );
}

export default SessionHeaderCom;
