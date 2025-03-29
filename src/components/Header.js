import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import DarkModeSwitch from "./DarkModeSwtch";

function Header() {
  return (
    <header className="justify-center items-center border-b border-primary-300 mx-6 md:mx-12 pb-2 z-20">
      <div className="flex justify-between gap-6 items-center mt-4 ">
        <Logo />
        <DarkModeSwitch />
      </div>
    </header>
  );
}

export default Header;
