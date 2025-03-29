// Navigation.js (Server Component)
import NavigationClient from "./NavigationClient";

export default function Navigation() {
  return (
    <nav className="hidden dark:font-semibold h-8 min-[601px]:flex gap-6 uppercase text-xs">
      <NavigationClient />
    </nav>
  );
}
