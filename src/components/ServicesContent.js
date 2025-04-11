"use client";

import { updateMultipleRowsContent } from "@/lib/actions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

export default function GalleryContent({ slug, initialData }) {
  const [pageData, setPageData] = useState(initialData);
  const queryClient = new QueryClient();
  const fileInputRefs = useRef({});

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        // Reset file inputs after submission
        Object.values(fileInputRefs.current).forEach((ref) => {
          if (ref) {
            ref.value = "";
          }
        });

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

      queryClient.invalidateQueries({ queryKey: ["gallery", slug] });
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Add index information to formData
    pageData.forEach((item, index) => {
      formData.append(`_index_${item.id}`, index);

      // Current image is always included in the form data
      if (item.image) {
        formData.append(`currentImage_${index}`, item.image);
      }
    });

    updateMutation.mutate(formData);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {pageData.map((item, index) => (
          <div key={item.id} className="col-span-1 mb-4">
            {/* ID included in a consistent format for the server action */}
            <input type="hidden" name={`id_${index}`} value={item.id} />

            <div className="flex flex-col gap-2">
              <label
                htmlFor={`file_${index}`}
                className="text-sm font-semibold"
              >
                Gallery Image {index + 1}
                {item.image && " (Current image will be used if none selected)"}
              </label>
              <Image
                src={item.image || "/placeholder.jpg"}
                alt="Gallery Image"
                width={300}
                height={300}
                className="rounded-md w-[300px] h-[300px] object-cover"
              />

              <div className="w-10/12">
                <input
                  type="file"
                  accept="image/*"
                  id={`file_${index}`}
                  name={`file_${index}`}
                  ref={(el) => (fileInputRefs.current[index] = el)}
                  disabled={updateMutation.isPending}
                  className="cursor-pointer w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 mb-4">
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
        ))}

        {/* Update button spans full width */}
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
    </div>
  );
}
