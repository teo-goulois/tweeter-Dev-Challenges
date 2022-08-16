import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  title: string;
  url: string;
  handleClick: (url: string) => void;
};

const LinkButton = ({ title, url, handleClick }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => handleClick(url)}
      className="flex-1 flex flex-col  items-center justify-between cursor-pointer"
    >
      <Link href={url}>
        <a
          className={`h-full flex items-center mx-2 font-semibold text-sm ${
            router.route === url ? "text-blue" : "text-secondary !font-medium"
          }`}
        >
          {title}
        </a>
      </Link>
      <div
        className={` h-1 w-full rounded-t-lg ${
          router.route === url ? "bg-blue" : ""
        } `}
      ></div>
    </div>
  );
};

export default LinkButton;
