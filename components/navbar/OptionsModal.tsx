import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
// Icons
import {
  PeopleIcon,
  SettingsIcon,
  SignoutIcon,
  UserIcon,
} from "../../icons/Icons";

type Props = {
  setOptionModaleIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const OptionsModal = ({ setOptionModaleIsOpen }: Props) => {
  const router = useRouter();

  const handleExitClick = () => {
    setOptionModaleIsOpen((prev) => !prev);
  };

  const handleLinkClick = (url: string) => {
    router.push(url);
    setOptionModaleIsOpen((prev) => !prev);
  };

  return (
    <div
      onClick={handleExitClick}
      className="fixed w-screen h-screen left-0 top-0 z-[1]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-20 min-w-[192px] absolute top-[5rem] right-[1rem] bg-white rounded-xl p-4 border border-[#E0E0E0] shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] "
      >
        {[
          ["My Profile", "/profile"],
          ["Group Chat", "/chats"],
          ["Settings", "/settings"],
        ].map(([title, url]) => {
          return (
            <button
              key={title}
              type="button"
              onClick={() => handleLinkClick(url)}
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
    </div>
  );
};

export default OptionsModal;
