"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogList({ slug, initialData }) {
  const [blogs, setBlogs] = useState(initialData || {});
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBlogClick = (blog) => {
    if (!slug) {
      console.error("Missing slug passed to BlogList");
      return;
    }

    localStorage.setItem("selectedBlog", JSON.stringify(blog));
    router.push(`/blogs/${slug}`);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
        {blogs.map((blog, index) => (
          <button
            key={blog.id}
            onClick={() => handleBlogClick(blog)}
            className="border-1 p-4 rounded-lg border-accent-950 cursor-pointer mb-b"
          >
            {/* Hidden ID or marker */}
            {!blog.isNew && (
              <input type="hidden" name={`id_${index}`} value={blog.id} />
            )}

            {/* Blog Title */}
            <div className="flex flex-col gap-2 mb-2">
              <label
                htmlFor={`title_${index}`}
                className="uppercase text-lg font-semibold"
              >
                {blog.title}
              </label>
            </div>

            {/* Blog Image */}
            <div className="flex flex-col gap-3 mb-4">
              <div className="w-full h-64 relative">
                <Image
                  src={blog.image}
                  sizes=""
                  alt="Blog Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </div>

            {/* Blog Excerpt */}
            <div className="flex flex-col gap-2 mb-3 text-start ">
              <label
                htmlFor={`excerpt_${index}`}
                className="text-sm font-semibold"
              >
                {blog.excerpt}
              </label>
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
          </button>
        ))}
      </div>
    </div>
  );
}
