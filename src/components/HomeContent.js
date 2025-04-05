"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import Button from "@/components/Button";

export default function HomeContent({ initialData }) {
  const [index, setIndex] = useState(0);

  const btnStyle =
    "cursor-pointer uppercase font-semibold p-2 rounded-md bg-accent-950 dark:bg-gray-800 text-gray-900 dark:text-gray-100";

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <form className="flex flex-col gap-4">
        {/* Cover */}
        <div className="flex flex-col gap-2">
          <label htmlFor="header" className="text-sm font-semibold">
            Header
          </label>
          <input
            type="text"
            id="coverHeader"
            defaultValue={initialData[0].coverHeader}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Sub Header
          </label>
          <textarea
            type="text"
            id="subHeader"
            defaultValue={initialData[0].coverSubHeader}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="header" className="text-sm font-semibold">
            Cover Image
          </label>
        </div>

        {/* About */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            About Title
          </label>
          <input
            type="text"
            id="aboutTitle"
            defaultValue={initialData[0].aboutTitle}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            About Rider
          </label>
          <textarea
            type="text"
            id="subHeader"
            defaultValue={initialData[0].aboutRider}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            About Hobbies
          </label>
          <textarea
            type="text"
            id="subHeader"
            defaultValue={initialData[0].aboutHobbies}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="header" className="text-sm font-semibold">
            About Image
          </label>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Services Title
          </label>
          <input
            type="text"
            id="aboutTitle"
            defaultValue={initialData[0].servicesTitle}
            className="p-2 rounded-md bg-primary-50 dark:bg-primary-950 text-primary-960 dark:text-primary-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Services Overview{" "}
          </label>
          <textarea
            type="text"
            id="subHeader"
            rows={3}
            defaultValue={initialData[0].servicesOverview}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Portfolio */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Portfolio Title
          </label>
          <input
            type="text"
            id="aboutTitle"
            defaultValue={initialData[0].portfolioTitle}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Portfolio Summary{" "}
          </label>
          <textarea
            type="text"
            id="subHeader"
            defaultValue={initialData[0].portfolioSummary}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Portfolio CTA
          </label>
          <input
            type="text"
            id="aboutTitle"
            defaultValue={initialData[0].portfolioCTA}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Testimonials */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Testimonial Title
          </label>
          <input
            type="text"
            id="aboutTitle"
            defaultValue={initialData[0].testimonialTitle}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Portfolio CTA
          </label>
          <input
            type="text"
            id="aboutTitle"
            defaultValue={initialData[0].testimonialItems}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <Button btnstyle={btnStyle}>Update Content</Button>
      </form>
    </div>
  );
}
