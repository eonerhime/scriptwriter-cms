"use client";

import { updateHome } from "@/lib/actions";
import SubmitButton from "./SubmitButton";
import { useState } from "react";

export default function HomeContent({ slug, initialData }) {
  // Extract object from array
  const data = initialData[0];

  // Image URL to the Supabase bucket
  const imageBucketUrl =
    "https://aavujdgrdxggljccomxv.supabase.co/storage/v1/object/public/profile-images/";

  // Track file objects
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [aboutImageFile, setAboutImageFile] = useState(null);

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
            formData.set("coverImage", data.coverImage || "");
          }

          // For new about image, add the bucket URL to the file name and pass it to the form data
          if (aboutImageFile) {
            formData.set(
              "aboutImage",
              `${imageBucketUrl}${aboutImageFile.name}`
            );
          } else {
            formData.set("aboutImage", data.aboutImage || "");
          }
          // Call the update function with the form data
          await updateHomeContent(formData);
        }}
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="id" value={data.id} />

        {/* Cover */}
        <div className="flex flex-col gap-2">
          <label htmlFor="coverHeader" className="text-sm font-semibold">
            Header
          </label>
          <input
            name="coverHeader"
            id="coverHeader"
            defaultValue={data.coverHeader}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="coverSubHeader" className="text-sm font-semibold">
            Sub Header
          </label>
          <textarea
            name="coverSubHeader"
            id="coverSubHeader"
            defaultValue={data.coverSubHeader}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="coverImage" className="text-sm font-semibold">
            Cover Image{" "}
            {data.coverImage && "(Current image will be used if none selected)"}
          </label>
          <div className="w-4/12">
            <input
              type="file"
              accept="image/*"
              name="coverImage"
              onChange={handleImageChangeCover}
              className="cursor-pointer w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col gap-2">
          <label htmlFor="aboutTitle" className="text-sm font-semibold">
            About Title
          </label>
          <input
            name="aboutTitle"
            id="aboutTitle"
            defaultValue={data.aboutTitle}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="aboutRider" className="text-sm font-semibold">
            About Rider
          </label>
          <textarea
            name="aboutRider"
            id="aboutRider"
            defaultValue={data.aboutRider}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="aboutHobbies" className="text-sm font-semibold">
            About Hobbies
          </label>
          <textarea
            name="aboutHobbies"
            id="aboutHobbies"
            defaultValue={data.aboutHobbies}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="aboutImage" className="text-sm font-semibold">
            About Image{" "}
            {data.aboutImage && "(Current image will be used if none selected)"}
          </label>
          <div className="w-4/12">
            <input
              type="file"
              accept="image/*"
              name="aboutImage"
              onChange={handleImageChangeAbout}
              className="cursor-pointer w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-2">
          <label htmlFor="servicesTitle" className="text-sm font-semibold">
            Services Title
          </label>
          <input
            name="servicesTitle"
            id="servicesTitle"
            defaultValue={data.servicesTitle}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="servicesOverview" className="text-sm font-semibold">
            Services Overview{" "}
          </label>
          <textarea
            name="servicesOverview"
            id="servicesOverview"
            rows={3}
            defaultValue={data.servicesOverview}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Portfolio */}
        <div className="flex flex-col gap-2">
          <label htmlFor="portfolioTitle" className="text-sm font-semibold">
            Portfolio Title
          </label>
          <input
            name="portfolioTitle"
            id="portfolioTitle"
            defaultValue={data.portfolioTitle}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="portfolioSummary" className="text-sm font-semibold">
            Portfolio Summary{" "}
          </label>
          <textarea
            name="portfolioSummary"
            id="portfolioSummary"
            defaultValue={data.portfolioSummary}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="portfolioCTA" className="text-sm font-semibold">
            Portfolio CTA
          </label>
          <input
            name="portfolioCTA"
            id="portfolioCTA"
            defaultValue={data.portfolioCTA}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Testimonials */}
        <div className="flex flex-col gap-2">
          <label htmlFor="testimonialTitle" className="text-sm font-semibold">
            Testimonial Title
          </label>
          <input
            name="testimonialTitle"
            id="testimonialTitle"
            defaultValue={data.testimonialTitle}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="testimonialItems" className="text-sm font-semibold">
            Testimonial Items
          </label>
          <input
            name="testimonialItems"
            id="testimonialItems"
            defaultValue={data.testimonialItems}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Form submit button */}
        <SubmitButton pendingLabel="Updating...">Update Content</SubmitButton>
      </form>
    </div>
  );
}
