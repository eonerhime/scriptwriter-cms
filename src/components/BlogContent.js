"use client";

import { createContent, updateContent } from "@/lib/actions";
import { getSupabaseClient } from "@/lib/getSupabaseClient";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import BackButton from "./BackButton";
import SubmitButton from "./SubmitButton";

export default function BlogContent({ slug, blog }) {
  const [imageFile, setImageFile] = useState({});
  const [pageData, setPageData] = useState(
    blog || { title: "", content: "", image: "" }
  );
  const [formValues, setFormValues] = useState({
    title: pageData?.title || "",
    content: pageData?.content || "",
    image: pageData?.image || "",
    excerpt: pageData?.excerpt || "",
  });
  const queryClient = new QueryClient();
  const fileInputRef = useRef({});
  const router = useRouter();
  const supabase = getSupabaseClient();

  // Generate an excerpt from the blog post content
  function createExcerpt(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  }

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        let imageUrl = pageData?.image || "";

        // Check if imageFile is valid before trying to upload
        // If no valid image file to upload, use existing image URL
        if (imageFile && imageFile instanceof File && imageFile.name) {
          try {
            const fileName = imageFile.name;

            // Upload directly from the client component
            const { error: uploadError } = await supabase.storage
              .from(`${slug}-images`)
              .upload(fileName, imageFile, {
                upsert: false, // Do not overwrite if file exists
                contentType: imageFile.type,
              });

            if (uploadError) {
              console.error("Upload error:", uploadError);
              throw new Error(`File upload failed: ${uploadError.message}`);
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
        formData.set("image", imageUrl);

        // Create excerpt from the blog post
        const content = formData.get("content");
        const excerpt = createExcerpt(content, 150);
        formData.set("excerpt", excerpt);

        // Convert formData into an object
        const formDataObj = Object.fromEntries(formData.entries());

        // Reset file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Call the server action with the form data (image is now a URL)
        let updatedData;
        if (pageData?.published) {
          updatedData = await createContent(slug, formDataObj);
        } else {
          updatedData = await updateContent(slug, formDataObj);
        }

        return updatedData || pageData;
      } catch (error) {
        console.error("Error in mutation:", error);
        return pageData;
      }
    },
    onSuccess: (updatedData) => {
      // Only update if we got valid data
      if (updatedData) {
        toast.success("Content updated successfully!");

        setPageData(updatedData);

        queryClient.invalidateQueries({ queryKey: ["blog", slug] });

        router.push("/blog"); // Redirect to the blogs page
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
    const formData = new FormData(e.target);

    // Add all form values to formData
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Set ID for existing blog posts only
    if (!pageData?.published && pageData?.id) {
      formData.set("id", pageData.id);
    }
    updateMutation.mutate(formData);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] px-4 pt-4 sm:p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <BackButton />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:mr-4">
        <input type="hidden" name="id" value={pageData?.id} />

        {/* Blog Title */}
        <div className="flex flex-col gap-2 mb-2 mt-2">
          <label htmlFor="title" className="text-sm font-semibold">
            Blog Title
          </label>
          <input
            name="title"
            id="title"
            onChange={handleInputChange}
            disabled={updateMutation.isPending}
            defaultValue={pageData?.title || ""}
            className="capitalize p-2 w-auto rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Blog Post */}
        <div className="flex flex-col gap-2 mb-3 w-full">
          <label htmlFor="content" className="text-sm font-semibold">
            Blog Post
          </label>
          <textarea
            name="content"
            id="content"
            onChange={handleInputChange}
            disabled={updateMutation.isPending}
            defaultValue={pageData?.content || ""}
            rows={10}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Blog Image */}
        <div className="flex flex-col gap-3 my-6 w-full sm:w-6/12 max-w-full sm:max-w-none">
          <label htmlFor="image" className="text-sm font-semibold mb-1">
            {!pageData?.published &&
              "Current image will be used if none selected"}
          </label>

          {pageData?.image && pageData?.image.trim() !== "" ? (
            <Image
              src={pageData?.image}
              alt={pageData?.title || "Blog image"}
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
            {pageData?.published ? "Create Blog" : "Update Blog"}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
