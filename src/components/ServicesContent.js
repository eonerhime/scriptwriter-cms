"use client";

import { updateMultipleRowsContent } from "@/lib/actions/actions";
import { getSupabaseClient } from "@/lib/getSupabaseClient";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

export default function ServicessContent({ slug, data }) {
  const [pageData, setPageData] = useState(data);
  const queryClient = new QueryClient();
  const supabase = getSupabaseClient();

  const [isPending, setIsPending] = useState(false);

  // const [services, setServices] = useState([...pageData]);

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        await updateMultipleRowsContent(slug, formData);

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

      // Update state with updated data
      setPageData(updatedData);

      // Display message on successful update
      toast.success("Content updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["services", slug] });
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Add index information to formData
    pageData?.forEach((item, index) => {
      formData.append(`_index_${item.id}`, index);
    });

    updateMutation.mutate(formData);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-0 sm:p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {pageData?.map((item, index) => (
          <div key={item.id} className="mb-4">
            {/* Hidden ID or marker */}
            {!item.isNew && (
              <input type="hidden" name={`id_${index}`} value={item.id} />
            )}

            {/* Service Offer */}
            <div className="flex flex-col gap-2 mb-2">
              <label
                htmlFor={`serviceOffer_${index}`}
                className="text-sm font-semibold"
              >
                Service Offer {item.isNew ? "(new)" : item.id}
              </label>
              <input
                name={`serviceOffer_${index}`}
                id={`serviceOffer_${index}`}
                defaultValue={item.serviceOffer}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Service Details */}
            <div className="flex flex-col gap-2 mb-3">
              <label
                htmlFor={`serviceDetails_${index}`}
                className="text-sm font-semibold"
              >
                Service {item.isNew ? "(new)" : item.id}
              </label>
              <textarea
                name={`serviceDetails_${index}`}
                id={`serviceDetails_${index}`}
                defaultValue={item.serviceDetails}
                rows={4}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Delete Checkbox */}
            {/* <div className="flex items-center gap-2 mb-4">
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
            </div> */}

            {/* Divider */}
            {index < pageData?.length - 1 && (
              <div className="border-1 border-gray-300 mt-12"></div>
            )}
          </div>
        ))}

        {/* Button actions */}
        <div className="text-center w-full mt-6">
          <SubmitButton
            key={isPending ? "pending" : "idle"}
            type="submit"
            isPending={isPending}
            pendingLabel="Updating..."
            btnStyle="mt-4 h-12 font-bold rounded w-full transition-colors cursor-pointer px-4 py-2 bg-accent-950  hover:bg-accent-950 hover:border-primary-50"
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
