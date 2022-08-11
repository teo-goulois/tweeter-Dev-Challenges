import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import {
  FollowIcon,
  PeopleIcon,
  SettingsIcon,
  SignoutIcon,
  UserIcon,
} from "../../icons/Icons";

const OptionsModal = () => {
  const router = useRouter();

  return (
    <div className="z-10 min-w-[192px] absolute -bottom-[14rem] right-[1rem] bg-white rounded-xl p-4 border border-[#E0E0E0] shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] ">
      {[
        ["My Profile", "/profile"],
        ["Group Chat", "/groupchat"],
        ["Settings", "/settings"],
      ].map(([title, url]) => {
        return (
          <button
            onClick={() => router.push(url)}
            className="text-gray flex items-center w-full  rounded-lg px-4 py-2  hover:bg-gray3 my-1"
          >
            <div className="h-6 mr-2">
              {title === "My Profile" ? (
                <UserIcon />
              ) : title === "Group Chat" ? (
                <PeopleIcon />
              ) : (
                <SettingsIcon />
              )}
            </div>
            <p className="text-xs font-medium capitalize">{title}</p>
          </button>
        );
      })}

      {/* divider */}
      <div className=" border border-gray3 rounded-xl"></div>
      <button
        onClick={() => signOut()}
        className="!text-red flex items-center w-full  rounded-lg px-4 py-2  hover:bg-gray3 mt-1"
      >
        <div className="h-6 mr-2">
          <SignoutIcon />
        </div>
        <p className="text-xs font-medium">Logout</p>
      </button>
    </div>
  );
};

export default OptionsModal;
