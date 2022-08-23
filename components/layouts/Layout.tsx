import React from "react";
import Navbar from "../navbar/Navbar";
import NavbarMobile from "../navbar/NavbarMobile";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    const openTab = 'home'
    const setOpenTab = () => {}
  return (
    <div className="bg-gray3 min-h-screen ">
      <Navbar  setOpenTab={setOpenTab} />
        {children}
      <div className="block md:hidden fixed w-full bottom-0">
        <NavbarMobile   />
      </div>
    </div>
  );
};

export default Layout;
