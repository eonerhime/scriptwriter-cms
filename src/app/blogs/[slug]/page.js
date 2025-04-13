"use client";

import { useEffect, useState } from "react";
import BlogContent from "@/components/BlogContent";
import Spinner from "@/components/Spinner";

export default function BlogPage({ params }) {
  const slug = params;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const storedBlog = localStorage.getItem("selectedBlog");

    if (storedBlog) {
      const parsed = JSON.parse(storedBlog);
      setBlog(parsed);
    }
  }, [slug]);

  if (!blog) {
    return <Spinner />;
  }

  return <BlogContent slug={slug} blog={blog} />;
}
