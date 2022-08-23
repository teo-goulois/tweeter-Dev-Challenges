import { motion } from "framer-motion";
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../chat/Navbar";
import Sidebar from "../chat/Sidebar";

type Props = {
  children: React.ReactElement;
};

const overlayVariants = {
  open: { opacity: 1, zIndex: 1 },
  closed: { opacity: 0, zIndex: -1 },
};

const ChatLayout = ({ children }: Props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>('')

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
        {
          <motion.div
            variants={overlayVariants}
            animate={sidebarIsOpen ? "open" : "closed"}
            transition={{ duration: 0.5 }}
            onClick={() => setSidebarIsOpen((prev) => !prev)}
            style={{ height: "inherit" }}
            className="fixed lg:relative w-screen lg:w-[35%] lg:max-w-[500px]  lg:bg-black/0 bg-secondary/20 z-[1]"
          >
            <Sidebar
            setChannelName={setChannelName}
              setSidebarIsOpen={setSidebarIsOpen}
              sidebarIsOpen={sidebarIsOpen}
            />
          </motion.div>
        }
        <div className="flex flex-col grow">
          <Navbar setSidebarIsOpen={setSidebarIsOpen} title={channelName} />

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
