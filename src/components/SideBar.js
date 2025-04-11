// app/SideBar.js (Server Component)
import { PathnameEnhancer } from "./PathnameEnhancer";
import { SideBarItems } from "./SideBarItems";

export default function SideBar() {
  // Pre-render with a default or empty pathname
  const defaultPathname = "home";

  return (
    <>
      <SideBarItems initialPathname={defaultPathname} />
      <PathnameEnhancer />
    </>
  );
}
