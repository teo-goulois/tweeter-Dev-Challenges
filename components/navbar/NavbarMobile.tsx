import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import {
  BookmarkIcon,
  CompassIcon,
  HomeIcon,
} from "../../icons/Icons";

type Props = {
  openTab: string;
  setOpenTab: Dispatch<SetStateAction<string>>;
};

const NavbarMobile = ({ openTab, setOpenTab }: Props) => {
  const router = useRouter()
   

  return (
    <div className="text-secondary flex px-1  bg-white">
      {/* home */}
      <div className="flex-1 flex flex-col items-center">
        <div
          onClick={() => router.push('/')}
          className="w-full flex flex-col justify-center items-center hover:bg-gray3 rounded-lg py-4 cursor-pointer my-2"
        >
          <div className={`h-5 ${router.route === "/" && "text-blue"}`}>
            <HomeIcon />
          </div>
        </div>
        <div
          className={` h-1 w-4/5 rounded-t-lg ${
            router.route === "/" ? "bg-blue" : ""
          } `}
        ></div>
      </div>
      {/* explore */}

      <div className="flex-1 flex flex-col items-center">
        <div
          onClick={() => router.push("explore")}
          className="w-full flex flex-col justify-center items-center hover:bg-gray3 rounded-lg py-4 cursor-pointer my-2"
        >
          <div className={`h-5 ${router.route === "/explore" && "text-blue"}`}>
            <CompassIcon />
          </div>
        </div>
        <div
          className={` h-1 w-4/5 rounded-t-lg ${
            router.route === "/explore" ? "bg-blue" : ""
          } `}
        ></div>
      </div>
      {/* bookmarks */}
      <div className="flex-1 flex flex-col items-center">
        <div
          onClick={() => router.push("/bookmarks")}
          className="w-full flex flex-col justify-center items-center hover:bg-gray3 rounded-lg py-4 cursor-pointer my-2"
        >
          <div className={`h-5 ${router.route === "bookmarks" && "text-blue"}`}>
            <BookmarkIcon />
          </div>
        </div>
        <div
          className={` h-1 w-4/5 rounded-t-lg ${
            router.route === "/bookmarks" ? "bg-blue" : ""
          } `}
        ></div>
      </div>
    </div>
  );
};

export default NavbarMobile;
