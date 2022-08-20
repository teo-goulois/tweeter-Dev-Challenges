import React, { Dispatch, SetStateAction } from "react";

type Props = {
  filter: "lastest" | "top" | "people" | "media",
  setFilter: Dispatch<SetStateAction<"lastest" | "top" | "people" | "media">>;
  
};

const Filter = ({ filter, setFilter }: Props) => {

  return (
    <div className="min-w-[304px] bg-white rounded-lg shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] font-[Poppins] font-semibold text-sm flex  lg:flex-col mb-2">
      {(
        ["top", "lastest", "people", "media"] as Array<
          "lastest" | "top" | "people" | "media"
        >
      ).map((title) => {
        return (
          <div
            key={title}
            onClick={() => setFilter(title)}
            className="lg:py-4 flex-1 flex flex-col-reverse lg:flex-row items-center cursor-pointer"
          >
            <div
              className={`lg:h-6 lg:w-1 lg:rounded-r-lg rounded-t-lg lg:mr-4 w-[80%] h-1  ${
                filter === title ? "bg-blue" : ""
              } `}
            ></div>
            <p
              className={`${
                filter === title && "!text-blue"
              } text-secondary py-2 capitalize my-4 text-center`}
            >
              {title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
