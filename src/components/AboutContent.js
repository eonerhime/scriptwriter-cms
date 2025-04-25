"use client";

import { updateContent } from "@/lib/actions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";
import Image from "next/image";
import { useRef } from "react";
import { getSupabaseClient } from "@/lib/getSupabaseClient";

// Create a client
const queryClient = new QueryClient();

export default function AboutContent({ slug, data }) {
  // Track file objects
  const [imageFile, setImageFile] = useState(null);
  const [pageData, setPageData] = useState(() => data?.[0] || {});
  const fileInputRef = useRef(null);
  const supabase = getSupabaseClient();
  const [isPending, setIsPending] = useState(false);

  // Image URL to the Supabase bucket
  const imageBucketUrl =
    "https://aavujdgrdxggljccomxv.supabase.co/storage/v1/object/public/profile-images/";

  // Updated useMutation hook that integrates with your form action
  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        // For new image, add the bucket URL to the file name and pass it to the form data
        if (imageFile) {
          formData.set("image", `${imageBucketUrl}${imageFile.name}`);
        } else {
          formData.set("image", pageData?.image);
        }

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        // Call the server action with the form data
        await updateContent(slug, formData);

        // Refetch updated data
        const { data: updatedData } = await supabase
          .from(slug)
          .select("*")
          .limit(1);

        return updatedData;
      } catch (error) {
        console.error("Error in mutation:", error);
        throw new Error(error.message || "Failed to update content");
      }
    },
    onMutate: () => {
      // Set pending state
      setIsPending(true);
    },
    onSuccess: (updatedData) => {
      // Set pending state
      setTimeout(() => {
        setIsPending(false);
      }, 500);

      // Update the local state with returned data
      setPageData(updatedData[0]);

      // Show success toast
      toast.success("Content updated successfully!");

      // Invalidate relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ["about", slug] });
    },
    onError: (error) => {
      // Show error toast
      toast.error(`Update failed: ${error.message}`);
    },
  });

  // Handle image change for about image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set("id", pageData?.id);

    // Trigger the mutation
    updateMutation.mutate(formData);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-0 sm:p-6 scrollbar-thin scrollbar-thumb-gray-400">
      {pageData && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={pageData?.id || ""} />

          {/* Header */}
          <div className="flex flex-col gap-2">
            <label htmlFor="header" className="text-sm font-semibold">
              Header
            </label>
            <input
              name="header"
              id="header"
              disabled={updateMutation.isPending}
              defaultValue={pageData?.header}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* About */}
          <div className="flex flex-col gap-2">
            <label htmlFor="about" className="text-sm font-semibold">
              About
            </label>
            <textarea
              name="about"
              id="about"
              disabled={updateMutation.isPending}
              defaultValue={pageData?.about}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Profile Image */}
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-sm font-semibold">
              About Image
              {pageData?.image &&
                " (Current image will be used if none selected)"}
            </label>
            <Image
              src={pageData?.image}
              alt="About Image"
              width={300}
              height={300}
            />
            <div className="w-full sm:w-6/12">
              <input
                type="file"
                accept="image/*"
                name="image"
                ref={fileInputRef}
                disabled={updateMutation.isPending}
                onChange={handleImageChange}
                className="cursor-pointer w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Hobbies */}
          <div className="flex flex-col gap-2">
            <label htmlFor="hobbies" className="text-sm font-semibold">
              Hobbies
            </label>
            <input
              name="hobbies"
              id="hobbies"
              disabled={updateMutation.isPending}
              defaultValue={pageData?.hobbies}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Form submit button */}
          <div className="text-center w-full mt-6">
            <SubmitButton
              key={isPending ? "pending" : "idle"}
              type="submit"
              btnStyle="mt-4 h-12 font-bold rounded w-full transition-colors cursor-pointer px-4 py-2 bg-accent-950  hover:bg-accent-950 hover:border-primary-50"
              isPending={isPending}
              pendingLabel="Updating..."
            >
              Update Content
            </SubmitButton>
          </div>
        </form>
      )}
    </div>
  );
}
