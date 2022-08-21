import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// images
import TweeterImage from "../../public/images/tweeter.svg";
import TwitterSmallImage from "../../public/images/tweeter-small.svg";

const Logo = () => {
    const router = useRouter()
  return (
    <>
      <div onClick={() => router.push('/explore')} className="hidden md:flex">
        <div className="cursor-pointer">
          <Image src={TweeterImage} />
        </div>
      </div>
      <div onClick={() => router.push('/')} className="flex md:hidden">
        <div className="cursor-pointer">
          <Image src={TwitterSmallImage} />
        </div>
      </div>
    </>
  );
};

export default Logo;
