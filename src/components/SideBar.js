import { ClientPathEnhancer } from "./ClientPathEnhancer";
import { SideBarItems } from "./SideBarItems";

export default function SideBar() {
  // Pre-render with a default or empty pathname
  const defaultPathname = "/home";

  return (
    <>
      <ClientPathEnhancer />
      <div className="sidebar">
        {/* Navigation items */}
        <SideBarItems initialPathname={defaultPathname} />
      </div>
    </>
  );
}
