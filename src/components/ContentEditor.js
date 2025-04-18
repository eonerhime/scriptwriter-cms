import AboutContent from "./AboutContent";
import BlogList from "./BlogList";
import GalleryContent from "./GalleryContent";
import HomeContent from "./HomeContent";
import PortfolioContent from "./PortfolioContent";
import ServicesContent from "./ServicesContent";
import TestimonialsContent from "./TestimonialsContent";
import UsersList from "./UsersList";

export default function ContentEditor({ slug, initialData, roles }) {
  return (
    <div className="w-full px-4 sm:px-10 max-w-screen-lg mx-auto">
      <div className="w-full flex flex-col mt-8 p-4 sm:p-6 border rounded-md shadow-md bg-primary-200 dark:bg-gray-700 text-primary-50 overflow-x-auto">
        <h2 className="text-xl uppercase text-center font-semibold mb-4 break-words">
          Edit{" "}
          <span className="text-accent-950 font-bold underline">{slug}</span>{" "}
          Page
        </h2>
        {slug === "home" && (
          <HomeContent slug={slug} initialData={initialData} />
        )}
        {slug === "about" && (
          <AboutContent slug={slug} initialData={initialData} />
        )}
        {slug === "services" && (
          <ServicesContent slug={slug} initialData={initialData} />
        )}
        {slug === "gallery" && (
          <GalleryContent slug={slug} initialData={initialData} />
        )}
        {slug === "portfolio" && (
          <PortfolioContent slug={slug} initialData={initialData} />
        )}
        {slug === "blog" && <BlogList slug={slug} initialData={initialData} />}
        {slug === "testimonials" && (
          <TestimonialsContent slug={slug} initialData={initialData} />
        )}
        {slug === "users" && (
          <UsersList
            slug={slug}
            initialData={initialData}
            roles={roles || []}
          />
        )}
      </div>
    </div>
  );
}
