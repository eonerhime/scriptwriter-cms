"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

export default function BlogList({ slug, data }) {
  const [blogs, setBlogs] = useState(data || {});
  const router = useRouter();

  const handleBlogClick = (blog) => {
    if (!slug) {
      console.error("Missing slug passed to BlogList");
      return;
    }
    // This is a workaround for the server action not being able to access local storage directly
    // Store the selected blog in local storage for later use
    localStorage.setItem("selectedBlog", JSON.stringify(blog));

    // Redirect to the blog creation page
    router.push(`/blogs/${slug}`);
  };

  const handleCreateNewBlog = () => {
    if (!slug) {
      console.error("Missing slug passed to BlogList");
      return;
    }

    // Create a new blog object with default values
    const newBlog = {
      // id: Date.now().toString(),
      title: "",
      content: "",
      image: "",
      excerpt: "",
      // date: new Date().toISOString(),
      published: true,
    };

    // Create a new blog object with default values
    localStorage.setItem("selectedBlog", JSON.stringify(newBlog));
    // Redirect to the blog creation page
    router.push(`/blogs/${slug}`);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] p-0 sm:p-6 scrollbar-thin scrollbar-thumb-gray-400">
      <div className="w-fit mb-4 ">
        <Button
          type="button"
          onClick={handleCreateNewBlog}
          btnStyle="mt-4 h-12 font-bold rounded w-full transition-colors cursor-pointer px-4 py-2 bg-accent-950 hover:bg-accent-950 hover:border-primary-50"
        >
          Create New Blog Post
        </Button>
      </div>
      <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
        {blogs.map((blog, index) => (
          <div key={blog?.id}>
            {/* View Blog post */}
            <button
              onClick={() => handleBlogClick(blog)}
              className="border-1 p-4 rounded-lg border-accent-950 cursor-pointer mb-b"
            >
              {/* Hidden ID or marker */}
              {!blog.isNew && (
                <input type="hidden" name={`id_${index}`} value={blog?.id} />
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
                <label htmlFor={`excerpt_${index}`} className="text-sm">
                  {blog.excerpt}
                </label>
              </div>
            </button>

            {/* Delete Checkbox */}
            {/* <div
              htmlFor={`delete_${index}`}
              className="flex items-center gap-2 mt-4 mb-4"
            >
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
          </div>
        ))}
      </div>
    </div>
  );
}
