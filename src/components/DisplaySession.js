"use client";

import { useSession } from "next-auth/react";

function DisplaySession() {
  const { data: session } = useSession();
  // const { fullName, role } = session?.user;

  return (
    <div className="mt-6">
      <h2 className="font-bold">
        Logged-in user:{" "}
        <span className="text-accent-950">{session?.user?.fullName} </span>|{" "}
        Role:{" "}
        {session?.user?.role
          .split(" ")
          .map((item) => {
            return item.slice(0, 1).toUpperCase() + item.slice(1);
          })
          .join(" ")}
      </h2>
    </div>
  );
}

export default DisplaySession;
