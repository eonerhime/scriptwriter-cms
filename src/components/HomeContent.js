"use client";

import { updateContent } from "@/lib/actions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

export default function HomeContent({ slug, initialData }) {
  // Track file objects
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [aboutImageFile, setAboutImageFile] = useState(null);
  const [pageData, setPageData] = useState(initialData[0]);
  const queryClient = new QueryClient();

  // Updated useMutation hook that integrates with your form action
  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        // For new cover image, add the bucket URL to the file name and pass it to the form data
        if (coverImageFile) {
          formData.set("coverImage", `${imageBucketUrl}${coverImageFile.name}`);
        } else {
          formData.set("coverImage", pageData.coverImage || "");
        }

        // For new about image, add the bucket URL to the file name and pass it to the form data
        if (aboutImageFile) {
          formData.set("aboutImage", `${imageBucketUrl}${aboutImageFile.name}`);
        } else {
          formData.set("aboutImage", pageData.aboutImage || "");
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
      // Show success toast
      toast.success("Content updated successfully!");

      // Update the local state with returned data
      setPageData(updatedData[0]);

      // Invalidate relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ["home", slug] });
    },
    onError: (error) => {
      // Show error toast
      toast.error(`Update failed: ${error.message}`);
    },
  });

  // Image URL to the Supabase bucket
  const imageBucketUrl =
    "https://aavujdgrdxggljccomxv.supabase.co/storage/v1/object/public/profile-images/";

  // Handle image change for cover image
  const handleImageChangeCover = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
    }
  };

  // Handle image change for about image
  const handleImageChangeAbout = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAboutImageFile(file);
    }
  };

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

        {/* Cover */}
        <div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="coverHeader" className="text-sm font-semibold">
              Header
            </label>
            <input
              name="coverHeader"
              id="coverHeader"
              disabled={updateMutation.isPending}
              defaultValue={pageData.coverHeader}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="coverSubHeader" className="text-sm font-semibold">
              Sub Header
            </label>
            <textarea
              name="coverSubHeader"
              id="coverSubHeader"
              disabled={updateMutation.isPending}
              defaultValue={pageData.coverSubHeader}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="coverImage" className="text-sm font-semibold">
              Cover Image{" "}
              {pageData.coverImage &&
                "(Current image will be used if none selected)"}
            </label>
            <div className="w-4/12">
              <input
                type="file"
                accept="image/*"
                name="coverImage"
                disabled={updateMutation.isPending}
                onChange={handleImageChangeCover}
                className="cursor-pointer w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="aboutTitle" className="text-sm font-semibold">
              About Title
            </label>
            <input
              name="aboutTitle"
              id="aboutTitle"
              disabled={updateMutation.isPending}
              defaultValue={pageData.aboutTitle}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="aboutRider" className="text-sm font-semibold">
              About Rider
            </label>
            <textarea
              name="aboutRider"
              id="aboutRider"
              disabled={updateMutation.isPending}
              defaultValue={pageData.aboutRider}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="aboutHobbies" className="text-sm font-semibold">
              About Hobbies
            </label>
            <textarea
              name="aboutHobbies"
              id="aboutHobbies"
              disabled={updateMutation.isPending}
              defaultValue={pageData.aboutHobbies}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="aboutImage" className="text-sm font-semibold">
              About Image{" "}
              {pageData.aboutImage &&
                "(Current image will be used if none selected)"}
            </label>
            <div className="w-4/12">
              <input
                type="file"
                accept="image/*"
                name="aboutImage"
                disabled={updateMutation.isPending}
                onChange={handleImageChangeAbout}
                className="cursor-pointer w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="servicesTitle" className="text-sm font-semibold">
              Services Title
            </label>
            <input
              name="servicesTitle"
              id="servicesTitle"
              disabled={updateMutation.isPending}
              defaultValue={pageData.servicesTitle}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="servicesOverview" className="text-sm font-semibold">
              Services Overview{" "}
            </label>
            <textarea
              name="servicesOverview"
              id="servicesOverview"
              rows={3}
              disabled={updateMutation.isPending}
              defaultValue={pageData.servicesOverview}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="portfolioTitle" className="text-sm font-semibold">
              Portfolio Title
            </label>
            <input
              name="portfolioTitle"
              id="portfolioTitle"
              disabled={updateMutation.isPending}
              defaultValue={pageData.portfolioTitle}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="portfolioSummary" className="text-sm font-semibold">
              Portfolio Summary{" "}
            </label>
            <textarea
              name="portfolioSummary"
              id="portfolioSummary"
              disabled={updateMutation.isPending}
              defaultValue={pageData.portfolioSummary}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="portfolioCTA" className="text-sm font-semibold">
              Portfolio CTA
            </label>
            <input
              name="portfolioCTA"
              id="portfolioCTA"
              disabled={updateMutation.isPending}
              defaultValue={pageData.portfolioCTA}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="testimonialTitle" className="text-sm font-semibold">
              Testimonial Title
            </label>
            <input
              name="testimonialTitle"
              id="testimonialTitle"
              disabled={updateMutation.isPending}
              defaultValue={pageData.testimonialTitle}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="testimonialItems" className="text-sm font-semibold">
              Testimonial Items
            </label>
            <input
              name="testimonialItems"
              id="testimonialItems"
              disabled={updateMutation.isPending}
              defaultValue={pageData.testimonialItems}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Form submit button */}
        <SubmitButton
          isPending={updateMutation.isPending}
          pendingLabel="Updating..."
        >
          Update Content
        </SubmitButton>
      </form>
    </div>
  );
}
