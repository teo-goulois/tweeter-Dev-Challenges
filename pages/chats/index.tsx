import React, { Dispatch, SetStateAction, useState } from "react";
// COoponents
import Index from "../../components/chat";
import Navbar from "../../components/chat/Navbar";
import Sidebar from "../../components/chat/Sidebar";

type Props = {
  setSidebarIsOpen: Dispatch<SetStateAction<boolean>>;
};

const index = ({ setSidebarIsOpen }: Props) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-primary text-xl font-semibold ">
        you have no channel selected
      </h1>
      <button
        onClick={() => setSidebarIsOpen((prev) => !prev)}
        type="button"
        className="px-4 py-2 bg-blue text-white rounded-lg my-4 font-thin text-lg"
      >
        Open your channels
      </button>
    </div>
  );
};

export default index;
