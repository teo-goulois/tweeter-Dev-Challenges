import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
// Context
import { useSession } from "next-auth/react";
// images
// Components
import LoginButton from "./buttons/Login";
import SignupButton from "./buttons/Signup";
import Logo from "./Logo";
import OptionsModal from "./OptionsModal";
import LinkButton from "./buttons/LinkButton";
// Icons
import { RoundArrowDropDownIcon } from "../../icons/Icons";

type Props = {
  setOpenTab: Dispatch<SetStateAction<string>>;
};

const Navbar = ({ setOpenTab }: Props) => {
  const [optionModalIsOpen, setOptionModaleIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = (url: string) => {
    setOpenTab(url);
    router.push(url);
  };

  return (
    <>
      <div className="relative bg-white flex justify-between shadow-[0_2px_2px_rgba(0, 0, 0, 0.05)] md:grid md:grid-cols-3 font-['Poppins'] md:px-4">
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
            if (!session?.user && (title === "home" || title === "bookmarks")) {
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
          {session ? (
            <button
              type="button"
              onClick={() => setOptionModaleIsOpen((prev) => !prev)}
              className="flex items-center float-right cursor-pointer"
            >
              <img
                alt="user image"
                src={
                  session.user.image.length > 0
                    ? session.user.image
                    : "https://lh3.googleusercontent.com/a/AItbvmm325lr8zSnqbAsJgMAkOOiA0ptP4JqVzzTVpOT=s96-c"
                }
                className="w-8 h-8 bg-blue rounded-lg float-right"
              ></img>
              <p className="font-bold text-xs text-primary pl-2">
                {" "}
                {session.user?.name}{" "}
              </p>
              <div className={`h-6 ${!optionModalIsOpen && "-rotate-90"}`}>
                <RoundArrowDropDownIcon />
              </div>
            </button>
          ) : (
            <div className="float-right grid grid-cols-2 gap-6 ">
              <LoginButton />
              <SignupButton />
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
