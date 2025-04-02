import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }) {
  const session = await auth();
  const slug = params.slug;

  if (!session) {
    return redirect("/login");
  }

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
    <div>
      <h1 className="text-2xl pt-4 font-bold">{slug.toUpperCase()}</h1>
      <p>{content}</p>
    </div>
  );
}
