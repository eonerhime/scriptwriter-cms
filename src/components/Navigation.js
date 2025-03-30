// Navigation.js (Server Component)
import NavigationClient from "./NavigationClient";

export default function Navigation() {
  return (
    <nav className="dark:font-semibold h-8 gap-6 uppercase text-xs">
      <NavigationClient />
    </nav>
  );
}
