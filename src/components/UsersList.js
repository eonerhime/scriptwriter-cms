"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

export default function UsersList({ slug, data, roles }) {
  const [users, setUsers] = useState(data || {});
  const router = useRouter();

  const handleUserClick = (user) => {
    if (!slug) {
      console.error("Missing slug passed to UsersList");
      return;
    }
    // This is a workaround for the server action not being able to access local storage directly
    // Store the selected user and roles in local storage for later use
    localStorage.setItem("selectedUser", JSON.stringify(user));
    localStorage.setItem("usersRoles", JSON.stringify(roles));

    // Redirect to the blog creation page
    router.push(`/users/${user.id}`);
  };

  const handleCreateNewUser = () => {
    if (!slug) {
      console.error("Missing slug passed to UsersList");
      return;
    }

    // Create a new user object with default values
    const newUser = {
      role: "super admin",
      email: "emo.onerhime@gmail.com",
      fullName: "Emo Onerhime",
      password: "asdf123",
      avatar_url:
        "https://aavujdgrdxggljccomxv.supabase.co/storage/v1/object/public/users-images/emo.jpg",
      published: true,
    };

    // Create a new user object with default values
    localStorage.setItem("selectedUser", JSON.stringify(newUser));
    localStorage.setItem("usersRoles", JSON.stringify(roles));

    // Redirect to the blog creation page
    router.push(`/users/${slug}`);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <div className="w-fit mb-8">
        <Button onClick={handleCreateNewUser}>Create New User</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {users.map((user, index) => (
          <div key={user?.id} className="mb-8">
            <div className="w-full h-full">
              <Button
                onClick={() => handleUserClick(user)}
                btnStyle="h-full w-full border-1 p-4 rounded-lg border-accent-950 cursor-pointer flex flex-col justify-between"
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
              </Button>

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
