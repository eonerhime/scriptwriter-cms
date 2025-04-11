import SideBarItems from "./SideBarItems";

const editAreas = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Footer", path: "/footer" },
  { name: "Users", path: "/users" },
];

// const createAreas = [
//   { name: "Portfolio", path: "/create/portfolio" },
//   { name: "Gallery", path: "/create/gallery" },
//   { name: "Blog", path: "/create/blog" },
//   { name: "User", path: "/create/user" },
// ];

export default function SideBar() {
  return <SideBarItems editAreas={editAreas} />;
}
