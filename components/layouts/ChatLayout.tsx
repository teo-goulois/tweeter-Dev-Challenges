import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../chat/Navbar";
import Sidebar from "../chat/Sidebar";

type Props = {
  children: React.ReactElement;
};

const ChatLayout = ({ children }: Props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      setSidebarIsOpen(true);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        setSidebarIsOpen(true);
      }
    });
  }, []);

  return (
    <Fragment>
      <div className="relative flex flex-col lg:flex-row grow test md:fullHeight ">
        {sidebarIsOpen && <Sidebar setSidebarIsOpen={setSidebarIsOpen} />}
        <div className="flex flex-col grow">
          <Navbar setSidebarIsOpen={setSidebarIsOpen} title={"Welcom"} />

          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              setSidebarIsOpen: setSidebarIsOpen,
            });
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default ChatLayout;
