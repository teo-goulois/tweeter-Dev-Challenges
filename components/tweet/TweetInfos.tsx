import React, { useContext } from "react";
import { motion } from "framer-motion";

// Icons
import {
  OutlineBookmarkIcon,
  OutlineCommentIcon,
  OutlineHeartIcon,
  RetweetIcon,
} from "../../icons/Icons";
import { Tweet } from "../../types/typing";
import { addLike } from "../../utils/addLike";
import { useSession } from "next-auth/react";
import useCheckIfChecked from "../../hooks/useCheckIfChecked";

// import { removeLike } from "../../../utils/removeLike";

import { TweetContext } from "../../context/TweetProvider";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

type Props = {
  tweet: Tweet;
  comments: number;
};

const TweetInfos = ({ tweet, comments }: Props) => {
  const { data: session } = useSession();
  const { tweets, setTweets } = useContext(TweetContext);

  const handleLike = async () => {
    if (session?.user?._id) {
      if (useCheckIfChecked(tweet.likes, session?.user?._id as string)) {
        /* const data = await removeLike(tweet._id, session?.user?._id, tweets);
        setTweets(data.tweets); */
      } else {
        console.log("ADD like");

        const data = await addLike(tweet._id, session?.user._id, tweets);
        setTweets(data.tweets);
      }
    } else {
      console.log("error: you should be connected to like");
    }
  };

  return (
    <>
      <div className="flex justify-end pb-1 font-medium text-xs text-gray4">
        <p className="mx-2">{comments} Comments</p>
        <p className="mx-2">
          {tweet.retweets ? tweet.retweets.length : "0"} Retweets
        </p>
        <p className="mx-2">
          {tweet.bookmarks ? tweet.bookmarks.length : "0"} Saved
        </p>
      </div>
      <div className="border-y border-gray3 py-1 flex ">
        <motion.div className="text-sm font-medium text-gray text-center hover:bg-gray3 rounded-lg py-2 flex-1 cursor-pointer flex justify-center items-center">
          <div className="h-4 mr-2">
            <OutlineCommentIcon />
          </div>
          <p className="hidden md:block">Comment</p>
        </motion.div>
        <div
          className={`${
            useCheckIfChecked(tweet.retweets, session?.user?._id as string) &&
            "text-red"
          } text-sm font-medium text-gray text-center hover:bg-gray3 rounded-lg py-2 flex-1 cursor-pointer flex justify-center items-center`}
        >
          <div className="h-4 mr-2">
            <RetweetIcon />
          </div>
          <p className="hidden md:block">Retweet</p>
        </div>
        <div
          onClick={handleLike}
          className={`${
            useCheckIfChecked(tweet.likes, session?.user?._id as string) &&
            "text-red"
          } text-sm font-medium text-gray text-center hover:bg-gray3 rounded-lg py-2 flex-1 cursor-pointer flex justify-center items-center`}
        >
          <div className={`h-4 mr-2 `}>
            <OutlineHeartIcon />
          </div>
          <p className="hidden md:block">Like</p>
        </div>
        <div
          className={`${
            useCheckIfChecked(tweet.bookmarks, session?.user?._id as string) &&
            "text-red"
          } text-sm font-medium text-gray text-center hover:bg-gray3 rounded-lg py-2 flex-1 cursor-pointer flex justify-center items-center`}
        >
          <div className="h-4 mr-2">
            <OutlineBookmarkIcon />
          </div>
          <p className="hidden md:block">Save</p>
        </div>
      </div>
    </>
  );
};

export default TweetInfos;
