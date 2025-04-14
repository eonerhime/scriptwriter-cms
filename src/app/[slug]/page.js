import ContentEditor from "@/components/ContentEditor";
import { getContent } from "@/lib/data-services";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  let filter = {};
  const { slug } = await params;
  // Ensure slug is always a string
  const resolvedSlug =
    typeof slug === "object" && slug?.slug ? slug.slug : slug;
  if (!slug) return <p className="text-red-500">Invalid page request</p>;

  // Set filter condition based on slug
  // For "blog", sort by created_at in descending order
  // For others, sort by id in ascending order
  filter =
    slug === "blog"
      ? { value: "created_at", status: false }
      : { value: "id", status: true };

  // Fetch content based on the slug
  const data = await getContent(slug, filter);

  // Handle empty responses
  if (!data || !data.length) return notFound();

  return <ContentEditor slug={resolvedSlug} initialData={data} />;
}
