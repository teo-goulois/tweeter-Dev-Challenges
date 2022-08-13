import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// Types
import { Tweet } from "../../types/typing";
import { fetchSavedCommentedTweets } from "../../utils/bookmarks/fetchSavedCommentedTweets";
// Hooks
import { fetchSavedMediaTweets } from "../../utils/bookmarks/fetchSavedMediaTweets";
import { fetchSavedTopTweets } from "../../utils/bookmarks/fetchSavedTopTweets";
import { fetchSavedTweets } from "../../utils/bookmarks/fetchSavedTweets";

type Props = {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
};

const Filter = ({ setTweets }: Props) => {
  const { data: session } = useSession();
  const [filter, setfilter] = useState<string>("tweets");

  useEffect(() => {
    const getTweets = async () => {
      if (!session?.user) return;
      switch (filter) {
        case "tweets":
          // code block
          const tweets = await fetchSavedTweets(session?.user._id);
          setTweets(tweets);
          break;
        case "tweets & replies":
          const tweetsAndReplies = await fetchSavedCommentedTweets(
            session?.user._id
          );
          setTweets(tweetsAndReplies);
          break;
        case "media":
          // code block
          const mediaTweets = await fetchSavedMediaTweets(session?.user._id);
          setTweets(mediaTweets);
          break;
        case "likes":
          const topTweets = await fetchSavedTopTweets(session?.user._id);
          setTweets(topTweets);
          break;
        default:
        // code block
      }
    };
    getTweets();
  }, [filter]);

  return (
    <div className="min-w-[304px] bg-white rounded-lg shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] font-[Poppins] font-semibold text-sm flex  lg:flex-col mb-2">
      {["tweets", "tweets & replies", "media", "likes"].map((title) => {
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
