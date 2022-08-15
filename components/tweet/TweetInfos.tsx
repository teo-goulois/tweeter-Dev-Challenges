import React, { ReactNode, useContext } from "react";
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

  const handleActivities = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, title: string) => {
    e.stopPropagation()
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
      <div className="flex justify-end pb-1 font-medium text-xs text-gray4 relative z-10">
        <p className="mx-2">{comments} Comments</p>
        <p className="mx-2">
          {tweet.retweets ? tweet.retweets.length : "0"} Retweets
        </p>
        <p className="mx-2">
          {tweet.bookmarks ? tweet.bookmarks.length : "0"} Saved
        </p>
      </div>
      <div className="border-y border-gray3 py-1 flex ">
        {[
          ["comment", <OutlineCommentIcon />, tweet.comments, "!text-primary"],
          ["retweet", <RetweetIcon />, tweet.retweets, "!text-green"],
          ["like", <OutlineHeartIcon />, tweet.likes, "!text-red"],
          ["save", <OutlineBookmarkIcon />, tweet.bookmarks, "!text-blue"],
        ].map(([title, component, array, color]) => {
          return (
            <button
              type="button"
              key={title as string}
              onClick={(e) => handleActivities(e, title as string)}
              className={`${
                useCheckIfChecked(
                  array as {
                    _id?: string;
                  }[],
                  session?.user?._id as string
                ) && color
              } text-sm font-medium text-gray text-center hover:bg-gray3 rounded-lg py-2 flex-1 cursor-pointer flex justify-center items-center`}
            >
              <div className="h-4 mr-2">{component as ReactNode}</div>
              <p className="hidden md:block capitalize">{title as string}</p>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TweetInfos;
