import Link from "next/link";
import React from "react";

import Image from "../public/images/space.jpg";

const FourOhFour = () => {
  return (
    <div className="test w-full flex flex-col justify-center items-center">
      <h1
        style={{ color: "transparent" }}
        className="text-[15rem] font-bold bg-clip-text bg-[url('../public/images/space.jpg')] bg-cover"
      >
        OOPS
      </h1>
      <p className="font-bold text-xl mb-4 uppercase">404. Page not found</p>
      <Link href="/explore">
        <a className="px-6 py-4 bg-blue rounded-lg text-white ">Go back home</a>
      </Link>
    </div>
  );
};

export default FourOhFour;
