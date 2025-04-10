"use client";

import { updateContent } from "@/lib/actions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

// Create a client
const queryClient = new QueryClient();

export default function ServicesContent({ slug, initialData }) {
  // Track file objects
  const [pageData, setPageData] = useState(initialData[0]);

  console.log("PAGE DATA", pageData);

  // Updated useMutation hook that integrates with your form action
  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        // Call the server action with the form data
        const updatedData = await updateContent(slug, formData);

        return updatedData;
      } catch (error) {
        console.error("Error in mutation:", error);
        throw new Error(error.message || "Failed to update content");
      }
    },
    onSuccess: (updatedData) => {
      // Show success toast
      toast.success("Content updated successfully!");

      // Update the local state with returned data
      setPageData(updatedData[0]);

      // Invalidate relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ["services", slug] });
    },
    onError: (error) => {
      // Show error toast
      toast.error(`Update failed: ${error.message}`);
    },
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("id", pageData.id);

    // Trigger the mutation
    updateMutation.mutate(formData);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={pageData.id} />

        {/* Service Offer */}
        <div className="flex flex-col gap-2">
          <label htmlFor="serviceOffer" className="text-sm font-semibold">
            Service Offer
          </label>
          <input
            name="serviceOffer"
            id="serviceOffer"
            disabled={updateMutation.isPending}
            defaultValue={pageData.serviceOffer}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Service Details */}
        <div className="flex flex-col gap-2">
          <label htmlFor="serviceDetails" className="text-sm font-semibold">
            Service Details
          </label>
          <textarea
            name="serviceDetails"
            id="serviceDetails"
            disabled={updateMutation.isPending}
            defaultValue={pageData.serviceDetails}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Form submit button */}
        <SubmitButton
          isPending={updateMutation.isPending}
          pendingLabel="Updating..."
          disabled={updateMutation.isPending}
        >
          Update Content
        </SubmitButton>
      </form>
    </div>
  );
}
