import Logo from "./Logo";
import SessionHeaderCom from "./SessionHeaderCom";

async function Header() {
  return (
    <header className="justify-center items-center border-b border-primary-300 mx-6 md:mx-12 pb-2 z-20">
      <div className="flex justify-between gap-6 items-center mt-4 ">
        <Logo />
        <SessionHeaderCom />
      </div>
    </header>
  );
}

export default Header;
