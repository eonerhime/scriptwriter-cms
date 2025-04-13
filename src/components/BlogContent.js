"use client";

import { updateContent } from "@/lib/actions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";
import BackButton from "./BackButton";

export default function BlogContent({ slug, blog }) {
  const [pageData, setPageData] = useState(blog);
  const queryClient = new QueryClient();
  const [imageFile, setImageFile] = useState({});
  const fileInputRef = useRef({});

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        // For new image, add the bucket URL to the file name and pass it to the form data
        if (imageFile) {
          formData.set("image", `${imageBucketUrl}${imageFile.name}`);
        } else {
          formData.set("image", pageData.image || "");
        }

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        // Call the server action with the form data
        const updatedData = await updateContent(slug, formData);

        return updatedData;
      } catch (error) {
        console.error("Error in mutation:", error);
        throw new Error(error.message || "Failed to update content");
      }
    },
    onSuccess: (updatedData) => {
      toast.success("Content updated successfully!");

      setPageData(updatedData);

      queryClient.invalidateQueries({ queryKey: ["blog", slug] });
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  // Image URL to the Supabase bucket
  const imageBucketUrl =
    "https://aavujdgrdxggljccomxv.supabase.co/storage/v1/object/public/blog-images/";

  // Handle image change for specific index
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

    formData.set("id", pageData.id);

    updateMutation.mutate(formData);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] px-4 pt-4 sm:p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <BackButton />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:mr-4">
        <input type="hidden" name="id" value={pageData.id} />

        {/* Blog Title */}
        <div className="flex flex-col gap-2 mb-2 mt-2">
          <label htmlFor="title" className="text-sm font-semibold">
            Blog Title
          </label>
          <input
            name="title"
            id="title"
            disabled={updateMutation.isPending}
            type="text"
            defaultValue={pageData.title}
            className="capitalize p-2 w-auto rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Blog Post */}
        <div className="flex flex-col gap-2 mb-3 w-full">
          <label htmlFor="blogPost" className="text-sm font-semibold">
            Blog Post
          </label>
          <textarea
            name="blogPost"
            id="blogPost"
            disabled={updateMutation.isPending}
            defaultValue={pageData.blogPost}
            rows={10}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Blog Image */}
        <div className="flex flex-col gap-3 my-6 w-full sm:w-6/12 max-w-full sm:max-w-none">
          <label htmlFor="image" className="text-sm font-semibold mb-1">
            Current image will be used if none selected
          </label>

          <div className="w-full">
            <Image
              src={pageData.image}
              alt="Blog Image"
              layout="responsive"
              width={400}
              height={400}
              className="rounded-md"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            name="image"
            ref={fileInputRef}
            disabled={updateMutation.isPending}
            onChange={handleImageChange}
            className="cursor-pointer p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Form submit button */}
        <div className="w-full sm:w-96 mt-6 self-center sm:mr-4">
          <SubmitButton
            isPending={updateMutation.isPending}
            pendingLabel="Updating..."
            disabled={updateMutation.isPending}
          >
            Update Content
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
