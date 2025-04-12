"use client";

import { updateMultipleRowsContent } from "@/lib/actions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";
import Image from "next/image";
import supabase from "@/lib/supabase";

export default function BlogContent({ slug, initialData }) {
  const [pageData, setPageData] = useState(initialData);
  const queryClient = new QueryClient();
  const [imageFiles, setImageFiles] = useState({});
  const fileInputRefs = useRef({});

  const imageBucketUrl =
    "https://aavujdgrdxggljccomxv.supabase.co/storage/v1/object/public/blog-images/";

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        // Handle file uploads first
        for (const [index, file] of Object.entries(imageFiles)) {
          if (file) {
            // Upload file to Supabase storage
            const fileName = file.name;
            const { error: uploadError } = await supabase.storage
              .from("blog-images")
              .upload(fileName, file, {
                upsert: true, // Overwrite if file exists
              });

            if (uploadError)
              throw new Error(`File upload failed: ${uploadError.message}`);

            // Set the image URL in formData
            formData.set(`image_${index}`, `${imageBucketUrl}${fileName}`);
          }
        }

        // Reset file inputs
        Object.values(fileInputRefs.current).forEach((ref) => {
          if (ref) {
            ref.value = "";
          }
        });

        // Clear image files state
        setImageFiles({});

        const updatedData = await updateMultipleRowsContent(slug, formData);

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

  // Handle adding a new testimonial
  // const handleAddService = (e) => {
  //   e.preventDefault();

  //   setServices((prev) => [
  //     ...prev,
  //     {
  //       id: `new-${Date.now()}`, // temporary unique key
  //       serviceOffer: "",
  //       serviceDetails: "",
  //       isNew: true,
  //     },
  //   ]);
  // };

  // Handle submit of form

  // Handle image change for specific index
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles((prev) => ({
        ...prev,
        [index]: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Add index information to formData
    pageData.forEach((item, index) => {
      formData.append(`_index_${item.id}`, index);

      // Add current image if no new image is selected
      if (!imageFiles[index] && item.image) {
        formData.set(`image_${index}`, item.image);
      }
    });

    updateMutation.mutate(formData);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        {pageData.map((item, index) => (
          <div key={item.id} className="mb-4">
            {/* Hidden ID or marker */}
            {!item.isNew && (
              <input type="hidden" name={`id_${index}`} value={item.id} />
            )}

            {/* Blog Title */}
            <div className="flex flex-col gap-2 mb-2">
              <label
                htmlFor={`title_${index}`}
                className="text-sm font-semibold"
              >
                Blog Title {item.isNew ? "(new)" : item.id}
              </label>
              <input
                name={`title_${index}`}
                id={`title_${index}`}
                defaultValue={item.title}
                className="capitalize p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Blog Excerpt */}
            <div className="flex flex-col gap-2 mb-3">
              <label
                htmlFor={`excerpt_${index}`}
                className="text-sm font-semibold"
              >
                Blog Excerpt
              </label>
              <textarea
                name={`excerpt_${index}`}
                id={`excerpt_${index}`}
                defaultValue={item.excerpt}
                rows={4}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Blog Image */}
            <div className="flex flex-col gap-3 mb-4">
              <label
                htmlFor={`image_${index}`}
                className="text-sm font-semibold mb-1"
              >
                Gallery Image {item.id}
                {item.image && " (Current image will be used if none selected)"}
              </label>
              <div className="w-full h-64 relative">
                <Image
                  src={item.image}
                  sizes=""
                  alt="Blog Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>

              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  id={`file_${index}`}
                  name={`file_${index}`}
                  ref={(el) => (fileInputRefs.current[index] = el)}
                  disabled={updateMutation.isPending}
                  onChange={(e) => handleImageChange(e, index)}
                  className="cursor-pointer w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Delete Checkbox */}
            <div className="flex items-center gap-2 mb-4">
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

            {/* Divider */}
            {/* {index < pageData.length - 1 && (
              <div className="w-full border-1 border-gray-300 mt-12"></div>
            )} */}
          </div>
        ))}

        {/* Button actions */}
        <div className="col-span-full text-center mt-6">
          <SubmitButton
            isPending={updateMutation.isPending}
            pendingLabel="Updating..."
            disabled={updateMutation.isPending}
          >
            Update Content
          </SubmitButton>
        </div>
      </form>

      {/* <div className="text-center w-full mt-6">
        <AddContentButton
          onClick={handleAddService}
          isPending={updateMutation.isPending}
          pendingLabel="Adding..."
        >
          Add Service Fields
        </AddContentButton>
      </div> */}
    </div>
  );
}
