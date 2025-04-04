import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SessionHeaderCom from "./SessionHeaderCom";

async function Header() {
  return (
    <header className="w-11/12 transparent-bg-primary-500 border-b border-primary-300 mx-6 md:mx-12 pb-2 z-20">
      <div className="flex justify-between gap-6 items-center mt-4 ">
        <div className="flex justify-center items-center gap-6">
          <MobileMenu />
          <Logo />
        </div>
        <SessionHeaderCom />
      </div>
    </header>
  );
}

export default Header;
