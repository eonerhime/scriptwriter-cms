"use client";

import Link from "next/link";
import Image from "next/image";
import favLogo from "../../public/favLogo.png";
import { useSession } from "next-auth/react";

function Logo() {
  const { data: session, status } = useSession();

  if (!session && status !== "authenticated") {
    return (
      <Link href="/home" className="flex justify-center">
        <Image
          src={favLogo}
          height={70}
          width={70}
          alt="Ifeoma Emo-Onerhime"
          quality={100}
          className="rounded-full"
        />
        <div className="flex flex-col justify-end text-xs">
          <span>
            Ifeoma <br />
            <b>Emo-Onerhime</b>
          </span>
          <span className="italic">Writer</span>
        </div>
      </Link>
    );
  }

  if (session && status === "authenticated") {
    return (
      <Link href="/home" className="hidden sm:flex justify-center">
        <Image
          src={favLogo}
          height={70}
          width={70}
          alt="Ifeoma Emo-Onerhime"
          quality={100}
          className="rounded-full"
        />
        <div className="max-[601px]:hidden flex flex-col justify-end text-xs">
          <span>
            Ifeoma <br />
            <b>Emo-Onerhime</b>
          </span>
          <span className="italic">Writer</span>
        </div>
      </Link>
    );
  }
}

export default Logo;
