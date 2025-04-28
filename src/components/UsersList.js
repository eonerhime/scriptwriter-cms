"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function UsersList({ slug, data, roles }) {
  const [users, setUsers] = useState(data || {});
  const router = useRouter();
  const { data: session } = useSession();
  const [notAdmin, setNotAdmin] = useState(false);

  useEffect(() => {
    if (
      session?.user?.role !== "super admin" &&
      session?.user?.role !== "admin"
    ) {
      setNotAdmin(true);
    } else {
      setNotAdmin(false);
    }
  }, [session]);

  const handleUserClick = (user) => {
    if (!slug) {
      console.error("Missing slug passed to UsersList");
      return;
    }
    // This is a workaround for the server action not being able to access local storage directly
    // Store the selected user and roles in local storage for later use
    localStorage.setItem("selectedUser", JSON.stringify(user));
    localStorage.setItem("usersRoles", JSON.stringify(roles));

    // Redirect to the blog creation page; pass slug for supabase filtering
    router.push(`/users/${slug}`);
  };

  const handleCreateNewUser = () => {
    if (!slug) {
      console.error("Missing slug passed to UsersList");
      return;
    }

    // Create a new user object with default values
    const newUser = {
      role: "",
      email: "",
      fullName: "",
      password: "",
      avatar_url: "",
      published: true,
    };

    // Create a new user object with default values
    localStorage.setItem("selectedUser", JSON.stringify(newUser));
    localStorage.setItem("usersRoles", JSON.stringify(roles));

    // Redirect to the blog creation page
    router.push(`/users/${slug}`);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-0 sm:p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <div className="w-fit mb-8">
        <Button
          type="button"
          role={notAdmin}
          onClick={handleCreateNewUser}
          btnStyle="mt-4 h-12 font-bold rounded w-full transition-colors cursor-pointer px-4 py-2"
        >
          Create New User
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {users.map((user, index) => (
          <div key={user?.id} className="mb-8">
            <div className="w-full h-full">
              <button
                onClick={() => handleUserClick(user)}
                className="h-full w-full border-1 p-4 rounded-lg border-accent-950 cursor-pointer flex flex-col justify-between"
              >
                {/* Hidden ID or marker */}
                <input type="hidden" name={`id_${index}`} value={user?.id} />

                {/* User Name */}
                <div className="flex flex-col gap-2 mb-2">
                  <label
                    htmlFor={`fullName_${index}`}
                    className="capitalize text-lg font-semibold"
                  >
                    {user.fullName}
                  </label>
                </div>

                {/* User Image */}
                <div className="flex flex-col gap-3 mb-4">
                  <div className="w-full h-64 relative">
                    <Image
                      src={user.avatar_url}
                      alt="User avatar"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                </div>

                {/* User Email */}
                <div className="flex flex-col gap-2 mb-3 text-center ">
                  <label htmlFor={`email_${index}`} className="text-sm">
                    {user.email}
                  </label>
                </div>

                {/* User Role */}
                <div className="flex font-bold flex-col text-center capitalize gap-2 mb-3">
                  <label htmlFor={`role_${index}`} className="text-sm">
                    {user.role}
                  </label>
                </div>
              </button>

              {/* Delete Checkbox */}
              <div
                htmlFor={`delete_${index}`}
                className="flex items-center gap-2 mt-2"
              >
                <input
                  type="checkbox"
                  id={`delete_${index}`}
                  name={`delete_${index}`}
                  className="cursor-pointer"
                />
                <label
                  htmlFor={`delete_${index}`}
                  className="text-sm text-red-600 font-semibold"
                >
                  Mark for deletion
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
