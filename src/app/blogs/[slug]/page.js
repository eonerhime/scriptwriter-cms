"use client";

import { useEffect, useState } from "react";
import BlogContent from "@/components/BlogContent";
import Spinner from "@/components/Spinner";
import { useParams } from "next/navigation";

export default function BlogPage() {
  const params = useParams();
  const slug = params?.slug;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const storedBlog = localStorage.getItem("selectedBlog");

    if (storedBlog) {
      const parsed = JSON.parse(storedBlog);
      setBlog(parsed);
    }
  }, [slug]);

  if (!blog) {
    return <p className="text-red-500">No blog found</p>;
  }

  return <BlogContent slug={slug} blog={blog} />;
}
