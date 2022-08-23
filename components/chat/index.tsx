import React from "react";
import { NavigationIcon } from "../../icons/Icons";
import Chat from "./Chat";

const Index = () => {
  return (
    <div className="bg-white h-full flex flex-col justify-between">
      {/* <Chat /> */}
      {/* input */}
      <div className="bg-gray3 px-2 py-1 mb-2 flex items-center rounded-lg overflow-hidden w-[90%] mx-auto ">
        <input type="text" placeholder="Chat away" className="bg-gray3 w-full p-4 text-base outline-none" />
        <button type="submit" aria-label="sumbit chat" className=" text-gray3 p-2 bg-secondary rounded-lg">
          <div className="h-8 rotate-45">
            <NavigationIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Index;
