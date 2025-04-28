"use client";

import { useSession } from "next-auth/react";

function DisplaySession() {
  const { fullName, role } = useSession()?.data?.user;

  console.log("SESSION:", fullName, role);

  return (
    <div className="mt-6">
      <h2 className="font-bold">
        Logged-in user: <span className="text-accent-950">{fullName} </span>|{" "}
        Role:{" "}
        {role
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
