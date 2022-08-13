import React from "react";
// Icons
import { SearchIcon } from "../../icons/Icons";

const Searchbar = () => {
  return (
    <form className="w-full bg-white flex items-center justify-between rounded-lg shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] p-2 text-gray4 font-medium ">
      <div className="flex justify-start items-center">
        <div className="h-6">
          <SearchIcon />
        </div>
        <input
          className="outline-none p-2 text-gray4"
          type="text"
          placeholder="Search"
        />
      </div>
      <button
        type="submit"
        className="text-white text-xs bg-blue px-6 py-3 rounded-[4px] "
      >
        Search
      </button>
    </form>
  );
};

export default Searchbar;
