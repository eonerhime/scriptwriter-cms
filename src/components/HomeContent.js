"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { updateHome } from "@/lib/actions";
import SubmitButton from "./SubmitButton";

export default function HomeContent({ slug, initialData }) {
  // Track file objects
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [aboutImageFile, setAboutImageFile] = useState(null);
  const [pageData, setPageData] = useState(initialData[0]);
  const { pending } = useFormStatus();

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

  // Update home content function with slug
  const updateHomeContent = updateHome.bind(null, slug);

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <form
        action={async (formData) => {
          // For new cover image, add the bucket URL to the file name and pass it to the form data
          if (coverImageFile) {
            formData.set(
              "coverImage",
              `${imageBucketUrl}${coverImageFile.name}`
            );
          } else {
            formData.set("coverImage", pageData.coverImage || "");
          }

          // For new about image, add the bucket URL to the file name and pass it to the form data
          if (aboutImageFile) {
            formData.set(
              "aboutImage",
              `${imageBucketUrl}${aboutImageFile.name}`
            );
          } else {
            formData.set("aboutImage", pageData.aboutImage || "");
          }
          // Call the update function with the form data and receive the updated records
          const updatedData = await updateHomeContent(formData);
          // Pass the returned updated records to the state
          setPageData(updatedData[0]);
        }}
        className="flex flex-col gap-4"
      >
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
              disabled={pending}
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
              disabled={pending}
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
                disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
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
                disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
              defaultValue={pageData.testimonialItems}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Form submit button */}
        <SubmitButton pendingLabel="Updating...">Update Content</SubmitButton>
      </form>
    </div>
  );
}
