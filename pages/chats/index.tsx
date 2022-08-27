import React, { Dispatch, SetStateAction } from "react";
// COoponents

type Props = {
  setSidebarIsOpen: Dispatch<SetStateAction<boolean>>;
};

const index = ({ setSidebarIsOpen }: Props) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-primary text-xl font-semibold lg:hidden">
        you have no channel selected
      </h1>
      <h1 className="text-primary text-xl font-semibold ">
        Selecte a channel
      </h1>
      <button
        onClick={() => setSidebarIsOpen((prev) => !prev)}
        type="button"
        className="px-4 py-2 bg-blue text-white rounded-lg my-4 font-thin text-lg lg:hidden"
      >
        Open your channels
      </button>
    </div>
  );
};

export default index;
