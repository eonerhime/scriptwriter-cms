"use client";

import { updateMultipleContent } from "@/lib/actions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

export default function TestimonialsContent({ slug, initialData }) {
  const [pageData, setPageData] = useState(initialData);
  const queryClient = new QueryClient();
  // const [services, setServices] = useState([...pageData]);

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        const updatedData = await updateMultipleContent(slug, formData);

        return updatedData;
      } catch (error) {
        console.error("Error in mutation:", error);
        throw new Error(error.message || "Failed to update content");
      }
    },
    onSuccess: (updatedData) => {
      toast.success("Content updated successfully!");

      setPageData(updatedData);

      queryClient.invalidateQueries({ queryKey: ["testimonials", slug] });
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Add index information to formData
    pageData.forEach((item, index) => {
      formData.append(`_index_${item.id}`, index);
    });

    updateMutation.mutate(formData);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {pageData.map((item, index) => (
          <div key={item.id} className="mb-4">
            {/* Hidden ID or marker */}
            {!item.isNew && (
              <input type="hidden" name={`id_${index}`} value={item.id} />
            )}

            {/* Testimonial Author */}
            <div className="flex flex-col gap-2 mb-2">
              <label
                htmlFor={`author_${index}`}
                className="text-sm font-semibold"
              >
                Author Name {item.isNew ? "(new)" : item.id}
              </label>
              <input
                name={`author_${index}`}
                id={`author_${index}`}
                defaultValue={item.author}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Testimonial Details */}
            <div className="flex flex-col gap-2 mb-3">
              <label
                htmlFor={`testimonial_${index}`}
                className="text-sm font-semibold"
              >
                Testimonial Details {item.isNew ? "(new)" : item.id}
              </label>
              <textarea
                name={`testimonial_${index}`}
                id={`testimonial_${index}`}
                defaultValue={item.testimonial}
                rows={4}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Author Profile */}
            <div className="flex flex-col gap-2 mb-3">
              <label
                htmlFor={`profile_${index}`}
                className="text-sm font-semibold"
              >
                Author Profile {item.isNew ? "(new)" : item.id}
              </label>
              <input
                name={`profile_${index}`}
                id={`profile_${index}`}
                defaultValue={item.profile}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
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
            {index < pageData.length - 1 && (
              <div className="border-1 border-gray-300 mt-12"></div>
            )}
          </div>
        ))}

        {/* Button actions */}
        <div className="text-center w-full mt-6">
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
