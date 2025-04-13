import DarkModeSwitch from "./DarkModeSwtch";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SessionHeaderCom from "./SessionHeaderCom";

async function Header() {
  return (
    <header className="w-11/12 mx-auto transparent-bg-primary-500 border-b border-primary-300 pb-2 z-20">
      <div className="flex justify-between gap-6 items-center mt-4">
        <div className="flex justify-center items-center gap-6">
          <MobileMenu />
          <Logo />
        </div>
        <div className="flex justify-center items-center gap-2 sm:gap-4">
          <DarkModeSwitch />
          <SessionHeaderCom />
        </div>
      </div>

      {/* Border line */}
      <div className="mt-2 h-[1px] bg-primary-300 w-full"></div>
    </header>
  );
}

export default Header;
