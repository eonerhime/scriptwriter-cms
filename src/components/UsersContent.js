"use client";

import { createUser, updateContent } from "@/lib/actions/actions";
import { getSupabaseClient } from "@/lib/getSupabaseClient";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import BackButton from "./BackButton";
import SubmitButton from "./SubmitButton";

export default function UsersContent({ slug, user, roles }) {
  const [imageFile, setImageFile] = useState({});
  const [userRoles, setUserRoles] = useState(roles[0] || []);
  const [pageData, setPageData] = useState(
    user || {
      role: "",
      email: "",
      fullName: "",
      password: "",
      avatar: "",
    }
  );
  const [formValues, setFormValues] = useState({
    role: pageData?.role || "",
    email: pageData?.email || "",
    fullName: pageData?.fullName || "",
    // password: pageData?.password || "",
    avatar_url: pageData?.avatar_url || "",
  });
  const [isPending, setIsPending] = useState(false);
  const [published, setPublished] = useState(pageData?.published || false);

  // Handle password and confirm password, and error state if there's a mismatch
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const queryClient = new QueryClient();
  const fileInputRef = useRef({});
  const router = useRouter();
  const supabase = getSupabaseClient();

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        let imageUrl = pageData?.avatar_url || "";

        // Check if imageFile is valid before trying to upload
        // If no valid image file to upload, use existing image URL
        if (imageFile && imageFile instanceof File && imageFile.name) {
          try {
            const fileName = imageFile.name;

            // Upload directly from the client component
            const { error: uploadError } = await supabase.storage
              .from(`${slug}-images`)
              .upload(fileName, imageFile, {
                upsert: true, // true overwrite, false don't overwrite
                contentType: imageFile.type,
              });

            if (uploadError) {
              console.error("Upload error:", uploadError);
              throw new Error(
                `File upload failed: ${uploadError.message || "Unknown error"}`
              );
            }

            // Get public URL
            const {
              data: { publicUrl },
            } = supabase.storage.from(`${slug}-images`).getPublicUrl(fileName);

            imageUrl = publicUrl;
          } catch (uploadErr) {
            console.error("Error during file upload:", uploadErr);
            // Continue with existing image URL if upload fails
          }
        }

        // Set the image URL in the form data
        formData.set("avatar_url", imageUrl);

        // Convert formData into an object
        const formDataObj = Object.fromEntries(formData.entries());

        // Reset file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        console.log("PROGRAM DATA:", pageData);

        if (published) {
          await createUser(slug, formDataObj);
          setPublished(false);
        } else {
          await updateContent(slug, formDataObj);
        }

        // Call the server action with the form data (image is now a URL)
        clearTimeout(pageData?.published);

        // Refetch updated data
        const { data: updatedData } = await supabase
          .from(slug)
          .select("*")
          .eq("email", formDataObj.email)
          .single();

        if (!updatedData) {
          throw new Error("Failed to create/update content");
        }

        console.log("UPDATED DATA:", updatedData);

        return updatedData;
      } catch (error) {
        console.error("Error in mutation:", error);
        return pageData;
      }
    },
    onMutate: () => {
      // Set pending state
      setIsPending(true);
    },
    onSuccess: (updatedData) => {
      if (updatedData) {
        // Set pending state
        setTimeout(() => {
          setIsPending(false);
        }, 500);

        // Update state with updated data
        setPageData(updatedData);

        // Display message on successful update
        toast.success("Content updated successfully!");

        queryClient.invalidateQueries({ queryKey: ["users", slug] });

        router.push("/users"); // Redirect to the users page
      }
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
      // Ensure pageData stays valid even on error
    },
  });

  // Handle image change for specific index
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Add a change handler function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    let password;
    let confirmPassword;
    const formData = new FormData(e.target);

    if (user.published) {
      password = formData.get("password");
      confirmPassword = formData.get("confirmPassword");
    }

    // Check if passwords match before new user is published
    if (user.published && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError(""); // Clear any previous error

    // Remove confirmPassword from formData since it's not in the DB
    formData.delete("confirmPassword");

    // Append extra values from formValues
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Set role
    formData.set("role", userRoles.role || pageData?.role || "");

    // Set ID if editing an existing user
    // if (!pageData?.published && pageData?.id) {
    formData.set("id", pageData?.id);
    // }

    updateMutation.mutate(formData);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-0 sm:p-6 mt-2 scrollbar-thin scrollbar-thumb-gray-400">
      <div className="border-1 p-4 rounded-lg border-accent-950 w-[640px] px-4 sm:px-10 max-w-screen-lg mx-auto">
        <BackButton />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={pageData?.id ?? ""} />

          {/* User Name */}
          <div className="flex flex-col gap-2 pb-2 pt-2">
            <label htmlFor="fullName" className="text-sm font-semibold">
              {user.published ? "Full Name" : "User Name"}
            </label>
            <input
              name="fullName"
              id="fullName"
              onChange={handleInputChange}
              disabled={updateMutation.isPending}
              defaultValue={pageData?.fullName || ""}
              className="capitalize w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required={user.published}
            />
          </div>

          {/* User Email */}
          <div className="flex flex-col gap-2 mb-3 w-full">
            <label htmlFor="email" className="text-sm font-semibold">
              User Email Address
            </label>
            <input
              name="email"
              id="email"
              onChange={handleInputChange}
              disabled={updateMutation.isPending}
              defaultValue={pageData?.email || ""}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required={user.published}
            />
          </div>

          {/* User Password */}
          {user.published && (
            <>
              <div className="flex flex-col gap-2 mb-3 w-full">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={updateMutation.isPending}
                  className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required={user.published}
                />
              </div>

              <div className="flex flex-col gap-2 mb-3 w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold"
                >
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={updateMutation.isPending}
                  className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required={user.published}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
              </div>
            </>
          )}

          {/* User Role */}
          <div className="flex flex-col gap-2 mb-3 w-full">
            <label htmlFor="role" className="text-sm font-semibold">
              Set User Role
            </label>
            <select
              name="role"
              id="role"
              required={user.published}
              value={pageData?.role ?? ""}
              onChange={(e) => {
                setPageData((prev) => ({ ...prev, role: e.target.value }));
              }}
              className="w-64 h-12 pl-4 pr-10 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border  rounded-md focus:outline-none focus:ring-2 focus:ring-white cursor-pointer hover:bg-primary-400 capitalize appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.25rem",
                WebkitAppearance: "none",
                MozAppearance: "none",
              }}
            >
              {user.published && <option value="">-- Select a Role --</option>}
              {Array.isArray(userRoles) &&
                userRoles.map((userRole) => (
                  <option key={userRole.id} value={userRole.role}>
                    {userRole.role}
                  </option>
                ))}
            </select>
          </div>

          {/* User Avatar */}
          <div className="flex flex-col gap-2 mb-3 w-full">
            <label
              htmlFor="avatar_url"
              className="w-full text-sm font-semibold"
            >
              {!pageData?.published &&
                "Current avatar will be used if none selected"}
            </label>
            <div className="flex flex-col gap-3 my-2 w-full sm:w-6/12 max-w-full sm:max-w-none">
              {pageData?.avatar_url && pageData?.avatar_url.trim() !== "" ? (
                <Image
                  src={pageData?.avatar_url}
                  alt={pageData?.fullName || "User image"}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-600 rounded-md mb-4 flex items-center justify-start">
                  <p className="text-gray-500 dark:text-gray-400">
                    No image selected
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                name="avatar_url"
                ref={fileInputRef}
                disabled={updateMutation.isPending}
                onChange={handleImageChange}
                className="cursor-pointer p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Form submit button */}
          <div className="w-full sm:w-96 mt-6  sm:mr-4">
            <SubmitButton
              key={isPending ? "pending" : "idle"}
              type="submit"
              isPending={isPending}
              pendingLabel="Updating..."
              btnStyle="mt-4 h-12 font-bold rounded w-full transition-colors cursor-pointer px-4 py-2 bg-accent-950  hover:bg-accent-950 hover:border-primary-50"
            >
              {pageData?.published ? "Create User" : "Update User"}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
