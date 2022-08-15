import { useRouter } from "next/router";
import React, { ReactNode } from "react";

type Props = {
  url: string;
  Icon: ReactNode;
};

const MobileNavbarButton = ({ url, Icon }: Props) => {
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col items-center">
      <div
        onClick={() => router.push(url)}
        className="w-full flex flex-col justify-center items-center hover:bg-gray3 rounded-lg py-4 cursor-pointer my-2"
      >
        <div className={`h-5 ${router.route === url && "text-blue"}`}>
          {Icon}
        </div>
      </div>
      <div
        className={` h-1 w-4/5 rounded-t-lg ${
          router.route === url ? "bg-blue" : ""
        } `}
      ></div>
    </div>
  );
};

export default MobileNavbarButton;
