import React, { Dispatch, SetStateAction } from "react";

type Props = {
  filter: "tweets" | "replies" | "media" | "likes";
  setFilter: Dispatch<SetStateAction<"tweets" | "replies" | "media" | "likes">>;
};
const Filter = ({ filter, setFilter }: Props) => {
  return (
    <div className="min-w-[304px]  lg:mr-4 bg-white rounded-lg shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] font-[Poppins] font-semibold text-sm flex  lg:flex-col mb-2">
      {(
        ["tweets", "replies", "media", "likes"] as Array<
          "tweets" | "replies" | "media" | "likes"
        >
      ).map((title) => {
        return (
          <div
            key={title}
            onClick={() => setFilter(title)}
            className="lg:py-1 flex-1 flex flex-col-reverse lg:flex-row items-center cursor-pointer"
          >
            <div
              className={`lg:h-6 lg:w-1 lg:rounded-r-lg rounded-t-lg lg:mr-4 w-[80%] h-1  ${
                filter === title ? "bg-blue" : ""
              } `}
            ></div>
            <p
              className={`${
                filter === title && "!text-blue"
              } text-secondary  capitalize my-4 text-center`}
            >
              {title === "replies" ? "tweets & replies" : title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
