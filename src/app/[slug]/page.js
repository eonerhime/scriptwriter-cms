import ContentEditor from "@/components/ContentEditor";
import {
  getAboutContent,
  getAllBlogContent,
  getHomeContent,
} from "@/lib/data-services";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;

  if (!slug) return <p className="text-red-500">Invalid page request</p>;

  // Fetch page content dynamically
  const contentFetchers = {
    home: getHomeContent,
    about: getAboutContent,
    blog: getAllBlogContent,
  };

  // Fetch selectes slug's data
  const fetchContent = contentFetchers[slug];

  // Handle invalid slugs
  if (!fetchContent) return notFound();

  const data = await fetchContent();

  // Handle empty responses
  if (!data || !data.length) return notFound();

  return <ContentEditor slug={slug} initialData={data} />;
}
