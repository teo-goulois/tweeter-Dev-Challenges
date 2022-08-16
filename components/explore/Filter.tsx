import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// types
import { Tweet } from "../../types/typing";
// Hooks
import { fetchMediaTweets } from "../../utils/explore/fetchMediaTweets";
import { fetchPeoples } from "../../utils/explore/fetchPeoples";
import { fetchTopTweets } from "../../utils/explore/fetchTopTweets";
import { fetchTweets } from "../../utils/fetchTweets";

type Props = {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
};

const Filter = ({ setTweets }: Props) => {
  const [filter, setfilter] = useState<string>("lastest");

  useEffect(() => {
    const getTweets = async () => {
      switch (filter) {
        case "top":          
          // code block
          const topTweets = await fetchTopTweets();          
          setTweets(topTweets);
          break;
        case "lastest":
          const lastestTweets = await fetchTweets();
          setTweets(lastestTweets);
          break;
        case "people":
          const peoples = await fetchPeoples()
          console.log(peoples, 'PEOPLEs');
          
          // code block
          break;
        case "media":
          const mediaTweets = await fetchMediaTweets();
          setTweets(mediaTweets);
          break;
        default:
        // code block
      }
    };
    getTweets();
  }, [filter]);

  return (
    <div className="min-w-[304px] bg-white rounded-lg shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] font-[Poppins] font-semibold text-sm flex  lg:flex-col mb-2">
      {["top", "lastest", "people", "media"].map((title) => {
        return (
          <div
            key={title}
            onClick={() => setfilter(title)}
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
