import React, { Dispatch, SetStateAction } from "react";
import { MenuIcon } from "../../icons/Icons";

type Props = {
  setSidebarIsOpen?: Dispatch<SetStateAction<boolean>>;
  title: string;
};

const Navbar = ({ setSidebarIsOpen, title }: Props) => {
  return (
    <div className="relative  flex items-center justify-start p-4 shadow text-primary">
      <button
        onClick={() => setSidebarIsOpen && setSidebarIsOpen((prev) => !prev)}
        type="button"
        aria-label="open sidebar"
        className="h-8 lg:hidden"
      >
        <MenuIcon />
      </button>
      <p className="uppercase font-bold text-lg ml-2">{title}</p>
    </div>
  );
};

export default Navbar;
