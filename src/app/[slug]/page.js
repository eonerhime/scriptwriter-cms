import ContentEditor from "@/components/ContentEditor";
import { getContent, getRole } from "@/lib/data-services";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  let filter = {};
  let roles = null;
  const { slug } = await params;

  // Check if slug is an Object and handle accordingly
  // Ensure slug is always a string
  const resolvedSlug =
    typeof slug === "object" && slug?.slug ? slug.slug : slug;
  if (!slug) return <p className="text-red-500">Invalid page request</p>;

  // Set filter condition based on slug
  // For "blog", sort by created_at in descending order: status === false
  // For others, sort by id in ascending order: status === true
  filter =
    slug === "blog"
      ? { value: "created_at", status: false }
      : { value: "id", status: true };

  // Fetch content based on the slug
  const data = await getContent(slug, filter);

  // Fetch role data only if slug is "users"
  // This is to ensure that the role is only fetched when necessary
  if (slug === "users") {
    roles = await getRole();
    if (!roles || !roles.length) return notFound();
  }

  // Handle empty responses
  if (!data || !data.length) return notFound();

  return (
    <ContentEditor slug={resolvedSlug} initialData={data} roles={roles || []} />
  );
}
