"use client";

import UsersContent from "@/components/UsersContent";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const params = useParams();
  const slug = params?.slug;
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    const storedRoles = localStorage.getItem("usersRoles");

    if (storedUser && storedRoles) {
      const parsed = JSON.parse(storedUser);
      const parsedRoles = JSON.parse(storedRoles);
      setUser(parsed);
      setRoles([parsedRoles]);
    }
  }, [slug]);

  if (!user) {
    return <p className="text-red-500">Invalid user</p>;
  }

  return <UsersContent slug={slug} user={user} roles={roles || []} />;
}
