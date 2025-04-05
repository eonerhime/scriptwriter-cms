"use client";

import AboutContent from "./AboutContent";
import HomeContent from "./HomeContent";

export default function ContentEditor({ slug, initialData }) {
  return (
    <div className="w-full px-6 sm:px-14 max-w-screen-lg mx-auto">
      <div className="w-full flex flex-col mt-8 p-4 sm:p-6 border rounded-md shadow-md bg-primary-200 dark:bg-gray-700 text-primary-50 overflow-x-auto">
        <h2 className="text-xl text-center font-semibold mb-4 capitalize break-words">
          Edit {slug} Content
        </h2>
        {slug === "home" && <HomeContent initialData={initialData} />}
        {slug === "about" && <AboutContent initialData={initialData} />}
      </div>
    </div>
  );
}
