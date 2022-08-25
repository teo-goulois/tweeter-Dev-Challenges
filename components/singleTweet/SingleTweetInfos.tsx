import React, { ReactNode } from "react";
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
// data relative
import useFollow from "../../utils/useFollow";
import useCommentsLength from "../../utils/comments/useCommentsLength";
import useConnectedUser from "../../utils/users/useConnectedUser";
import updateTweetInfos from "../../utils/tweet/updateTweetInfos";
import { motion } from "framer-motion";

const variants = {
  hover: { y: -20, opacity: 0, height: 0 },
};
const variants2 = {
  hover: { y: -10, opacity: 1, height: "fit" },
};

type Props = {
  tweet: Tweet;
  setCommentIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TweetInfos = ({ tweet, setCommentIsOpen }: Props) => {
  const { user } = useConnectedUser();
  const { commentsLength } = useCommentsLength(tweet._id);

  const handleActivities = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string
  ) => {
    e.stopPropagation();
    if (!user) return toast.error(`you should be connected to ${title}`);

    switch (title) {
      case "comment":
        if (tweet.everyoneCanReply) {
          return setCommentIsOpen((prev) => !prev);
        }
        // check if we are follower
        if (useFollow(user, tweet.author)) {
          setCommentIsOpen((prev) => !prev);
        } else {
          toast.error("only the follower can reply");
        }
        break;
      case "retweet":
        if (tweet.retweets.includes(user._id)) {
          updateTweetInfos(
            user._id,
            tweet._id,
            "retweets",
            false
          );
        } else {
          updateTweetInfos(
            user._id,
            tweet._id,
            "retweets",
            true
          );
        }
        break;
      case "like":
        if (tweet.likes.includes(user._id)) {
          // remove like
          updateTweetInfos(
            user._id,
            tweet._id,
            "likes",
            false
          );
        } else {
          updateTweetInfos(
            user._id,
            tweet._id,
            "likes",
            true
          );
        }
        break;
      case "save":
        if (tweet.bookmarks.includes(user._id)) {
          // remove bookmark
          updateTweetInfos(
            user._id,
            tweet._id,
            "bookmarks",
            false
          );
        } else {
          updateTweetInfos(
            user._id,
            tweet._id,
            "bookmarks",
            true
          );
        }
        break;
      default:
    }
  };
  return (
    <>
      <div className="flex justify-end pb-1 font-medium text-xs text-gray4 relative ">
        <p className="mx-2">{commentsLength?.toString()} Comments</p>
        <p className="mx-2">
          {tweet.retweets ? tweet.retweets.length : "0"} Retweets
        </p>
        <p className="mx-2">
          {tweet.bookmarks ? tweet.bookmarks.length : "0"} Saved
        </p>
      </div>
      <div className="border-y border-gray3 py-1 flex ">
        {[
          ["comment", <OutlineCommentIcon />, "!text-primary"] as [
            string,
            JSX.Element,
            string
          ],
          ["retweet", <RetweetIcon />, tweet.retweets, "!text-green"] as [
            string,
            JSX.Element,
            string[],
            string
          ],
          ["like", <OutlineHeartIcon />, tweet.likes, "!text-red"] as [
            string,
            JSX.Element,
            string[],
            string
          ],
          ["save", <OutlineBookmarkIcon />, tweet.bookmarks, "!text-blue"] as [
            string,
            JSX.Element,
            string[],
            string
          ],
        ].map(([title, component, array, color]) => {
          return (
            <motion.button
              whileHover="hover"
              type="button"
              key={title as string}
              onClick={(e) => handleActivities(e, title as string)}
              className={`${
                // @ts-ignore
                user && title !== "comment" && array.includes(user._id) && color
              } text-sm font-medium text-gray text-center hover:bg-gray3 rounded-lg py-2 flex-1 cursor-pointer flex justify-center items-center`}
            >
              <div className="h-4 mr-2">{component as ReactNode}</div>
              <div>
                <motion.p
                  variants={variants}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                  className="hidden md:block capitalize"
                >
                  {title as string}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  variants={variants2}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                  className="hidden md:block capitalize"
                >
                  {title !== "comment"
                    ? array.length
                    : commentsLength?.toString()}
                </motion.p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </>
  );
};

export default TweetInfos;
