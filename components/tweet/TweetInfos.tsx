import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
// Icons
import {
  OutlineBookmarkIcon,
  OutlineCommentIcon,
  OutlineHeartIcon,
  RetweetIcon,
} from "../../icons/Icons";
// Types
import { Tweet } from "../../types/typing";
// Hooks
import useCheckIfChecked from "../../hooks/useCheckIfChecked";
import { addLike } from "../../utils/addLike";
import { removeLike } from "../../utils/removeLike";
import { removeRetweet } from "../../utils/removeRetweet";
import { addRetweet } from "../../utils/addRetweet";
import { removeBookmark } from "../../utils/removeBookmark";
import { addBookmark } from "../../utils/addBookmark";
// Context
import { TweetContext } from "../../context/TweetProvider";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

type Props = {
  tweet: Tweet;
  comments: number;
  setCommentIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TweetInfos = ({ tweet, comments, setCommentIsOpen }: Props) => {
  const { data: session } = useSession();
  const { tweets, setTweets } = useContext(TweetContext);

  const handleActivities = async (title: string) => {
    if (!session?.user)
      return toast.error(`you should be connected to ${title}`);

    switch (title) {
      case "comment":
        setCommentIsOpen((prev) => !prev);
        break;
      case "retweet":
        if (useCheckIfChecked(tweet.retweets, session?.user?._id as string)) {
          const data = await removeRetweet(
            tweet._id,
            session?.user?._id,
            tweets
          );
          data?.tweets
            ? setTweets(data.tweets)
            : console.log("an errro occured please try again later");
        } else {
          const data = await addRetweet(tweet._id, session?.user._id, tweets);
          data?.tweets
            ? setTweets(data.tweets)
            : console.log("an errro occured please try again later");
        }
        break;
      case "like":
        if (useCheckIfChecked(tweet.likes, session?.user?._id as string)) {
          const data = await removeLike(tweet._id, session?.user?._id, tweets);
          data?.tweets
            ? setTweets(data.tweets)
            : console.log("an errro occured please try again later");
        } else {
          const data = await addLike(tweet._id, session?.user._id, tweets);
          data?.tweets
            ? setTweets(data.tweets)
            : console.log("an errro occured please try again later");
        }
        break;
      case "save":
        if (useCheckIfChecked(tweet.bookmarks, session?.user?._id as string)) {
          const data = await removeBookmark(
            tweet._id,
            session?.user?._id,
            tweets
          );
          data?.tweets
            ? setTweets(data.tweets)
            : toast.error("an errro occured please try again later");
        } else {
          const data = await addBookmark(tweet._id, session?.user._id, tweets);
          data?.tweets
            ? setTweets(data.tweets)
            : toast.error("an errro occured please try again later");
        }
        break;
      default:
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
           {
            
           }
        <motion.div
          onClick={() => handleActivities("comment")}
          className="text-sm font-medium text-gray text-center hover:bg-gray3 rounded-lg py-2 flex-1 cursor-pointer flex justify-center items-center"
        >
          <div className="h-4 mr-2">
            <OutlineCommentIcon />
          </div>
          <p className="hidden md:block">Comment</p>
        </motion.div>
        <div
          onClick={() => handleActivities("retweet")}
          className={`${
            useCheckIfChecked(tweet.retweets, session?.user?._id as string) &&
            "text-green"
          } text-sm font-medium text-gray text-center hover:bg-gray3 rounded-lg py-2 flex-1 cursor-pointer flex justify-center items-center`}
        >
          <div className="h-4 mr-2">
            <RetweetIcon />
          </div>
          <p className="hidden md:block">Retweet</p>
        </div>
        <div
          onClick={() => handleActivities("like")}
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
          onClick={() => handleActivities("save")}
          className={`${
            useCheckIfChecked(tweet.bookmarks, session?.user?._id as string) &&
            "!text-blue"
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
