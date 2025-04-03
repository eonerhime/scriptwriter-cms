import { auth } from "@/lib/auth";
import { getAllBlogs, getHomeContent } from "@/lib/data-services";
import supabase from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;

  if (!slug) return <p className="text-red-500">Invalid page request</p>;

  // Fetch page content dynamically
  // const contentFetchers = {
  //   home: getHomeContent,
  //   blog: getAllBlogs,
  // };

  // Fetch selectes slug's data
  // const fetchContent = contentFetchers[slug];

  // Handle invalid slugs
  // if (!fetchContent) return notFound();

  // const data = await fetchContent();

  // Handle empty responses
  // if (!data || !data.length) return notFound();

  // const { coverHeader } = data[0];

  const contentMap = {
    home: "Welcome to the Home Page!",
    about: "About Us Content",
    services: "Our Services",
    gallery: "Gallery Showcase",
    portfolio: "Our Portfolio",
    blog: "Latest Blog Posts",
    contact: "Contact Information",
  };

  const content = contentMap[slug];

  if (!content) return notFound();

  return (
    <div className="p-6">
      <p>{content}</p>
    </div>
  );
}
