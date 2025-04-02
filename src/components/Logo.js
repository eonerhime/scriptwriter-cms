import Link from "next/link";
import Image from "next/image";
import favLogo from "../../public/favLogo.png";

function Logo() {
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

export default Logo;
