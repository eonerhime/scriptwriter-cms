import ContentEditor from "@/components/ContentEditor";
import { getContent } from "@/lib/data-services";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;
  // Ensure slug is always a string
  const resolvedSlug =
    typeof slug === "object" && slug?.slug ? slug.slug : slug;
  if (!slug) return <p className="text-red-500">Invalid page request</p>;

  // Fetch content based on the slug
  const data = await getContent(slug);

  // Handle empty responses
  if (!data || !data.length) return notFound();

  return <ContentEditor slug={resolvedSlug} initialData={data} />;
}
