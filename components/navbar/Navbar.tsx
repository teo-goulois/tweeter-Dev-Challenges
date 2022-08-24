import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
// Context
// images
// Components
import LoginButton from "./buttons/Login";
import Logo from "./Logo";
import OptionsModal from "./OptionsModal";
import LinkButton from "./buttons/LinkButton";
// Icons
import { RoundArrowDropDownIcon } from "../../icons/Icons";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {
  setOpenTab: Dispatch<SetStateAction<string>>;
};

const Navbar = ({ setOpenTab }: Props) => {
  const [optionModalIsOpen, setOptionModaleIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const {user} = useConnectedUser()

  const handleClick = (url: string) => {
    setOpenTab(url);
    router.push(url);
  };

  return (
    <>
      <div className="relative z-10 bg-white flex justify-between shadow-[0_2px_2px_rgba(0, 0, 0, 0.05)] md:grid md:grid-cols-3 font-['Poppins'] md:px-4">
        {/* Logo */}
        <div className="m-4 flex items-center">
          <Logo />
        </div>

        {/* nav links on desktop */}
        <nav className="hidden md:flex ">
          {[
            ["home", "/"],
            ["explore", "/explore"],
            ["bookmarks", "/bookmarks"],
          ].map(([title, url]) => {
            if (!user && (title === "home" || title === "bookmarks")) {
              // manage Auth
              return;
            }
            return (
              <LinkButton
                key={title}
                title={title}
                url={url}
                handleClick={handleClick}
              />
            );
          })}
        </nav>

        {/* profile */}
        <div className="relative m-4">
          {/* if loggin show profil pic otherwise show auth buttons */}
          {user ? (
            <button
              type="button"
              onClick={() => setOptionModaleIsOpen((prev) => !prev)}
              className="flex items-center float-right cursor-pointer"
            >
              <img
                alt="user image"
                src={
                  user.image.length > 0
                    ? user.image
                    : "https://lh3.googleusercontent.com/a/AItbvmm325lr8zSnqbAsJgMAkOOiA0ptP4JqVzzTVpOT=s96-c"
                }
                className="w-8 h-8 rounded-lg float-right"
              ></img>
              <p className="font-bold text-xs text-primary pl-2">
                {" "}
                {user?.name}{" "}
              </p>
              <div className={`h-6 ${!optionModalIsOpen && "-rotate-90"}`}>
                <RoundArrowDropDownIcon />
              </div>
            </button>
          ) : (
            <div className="float-right grid grid-cols-1 gap-6 ">
              <LoginButton />
             {/*  <SignupButton /> */}
            </div>
          )}
        </div>
        {optionModalIsOpen && (
          <OptionsModal setOptionModaleIsOpen={setOptionModaleIsOpen} />
        )}
      </div>
    </>
  );
};

export default Navbar;
