import AboutContent from "./AboutContent";
import BlogList from "./BlogList";
import GalleryContent from "./GalleryContent";
import HomeContent from "./HomeContent";
import PortfolioContent from "./PortfolioContent";
import ServicesContent from "./ServicesContent";
import TestimonialsContent from "./TestimonialsContent";
import UsersList from "./UsersList";

export default function ContentEditor({ slug, data, roles }) {
  return (
    <div className="w-full px-4 sm:px-10 max-w-screen-lg mx-auto">
      <div className="w-full flex flex-col mt-8 p-4 sm:p-6 border rounded-md shadow-md bg-primary-200 dark:bg-gray-700 text-primary-50 overflow-x-auto">
        <h2 className="text-xl uppercase text-center font-semibold mb-4 break-words">
          Edit{" "}
          <span className="text-accent-950 font-bold underline">{slug}</span>{" "}
          Page
        </h2>
        {slug === "home" && <HomeContent slug={slug} data={data} />}
        {slug === "about" && <AboutContent slug={slug} data={data} />}
        {slug === "services" && <ServicesContent slug={slug} data={data} />}
        {slug === "gallery" && <GalleryContent slug={slug} data={data} />}
        {slug === "portfolio" && <PortfolioContent slug={slug} data={data} />}
        {slug === "blog" && <BlogList slug={slug} data={data} />}
        {slug === "testimonials" && (
          <TestimonialsContent slug={slug} data={data} />
        )}
        {slug === "users" && (
          <UsersList slug={slug} data={data} roles={roles || []} />
        )}
      </div>
    </div>
  );
}
