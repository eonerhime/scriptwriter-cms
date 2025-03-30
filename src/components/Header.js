import DarkModeSwitch from "./DarkModeSwtch";
import Logo from "./Logo";
import Logout from "./Logout";

function Header() {
  return (
    <header className="justify-center items-center border-b border-primary-300 mx-6 md:mx-12 pb-2 z-20">
      <div className="flex justify-between gap-6 items-center mt-4 ">
        <Logo />
        <div className="flex justify-center items-center gap-8">
          <DarkModeSwitch />
          <Logout />
        </div>
      </div>
    </header>
  );
}

export default Header;
