import Image from "next/image";
import DarkModeSwitch from "./DarkModeSwtch";
import Logo from "./Logo";
import Logout from "./Logout";
import { auth } from "@/lib/auth";

async function Header() {
  const session = await auth();
  console.log(session);

  return (
    <header className="justify-center items-center border-b border-primary-300 mx-6 md:mx-12 pb-2 z-20">
      <div className="flex justify-between gap-6 items-center mt-4 ">
        <Logo />
        <div className="flex justify-center items-center gap-8">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              width={30}
              height={30}
              alt={session.user.image}
              referrerPolicy="no-referrer"
              className="rounded-full"
            />
          )}
          <DarkModeSwitch />
          {session?.user && <Logout />}
        </div>
      </div>
    </header>
  );
}

export default Header;
