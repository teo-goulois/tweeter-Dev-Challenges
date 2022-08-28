import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
// Icons
import {
  OutlineBookmarkIcon,
  OutlineCommentIcon,
  OutlineHeartIcon,
  RetweetIcon,
} from "../../icons/Icons";
// Types
import { Tweet, Comment } from "../../types/typing";
// data relative
import updateTweetInfos from "../../utils/global/updateTweetInfos";
import useConnectedUser from "../../utils/users/useConnectedUser";
import useCommentsLength from "../../utils/comments/useCommentsLength";
import { motion } from "framer-motion";
import { KeyedMutator } from "swr";
import useInfiniteTweet from "../../utils/explore/useInfiniteTweets";
// Context

const variants = {
  hover: { y: -20, opacity: 0, height: 0 },
};
const variants2 = {
  hover: { y: -10, opacity: 1, height: "fit" },
};

type Props = {
  tweet: Tweet;
  handleUpdateInfos: ({
    tweetID,
    userID,
    title,
    isAdding,
  }: {
    tweetID: string;
    userID: string;
    title: "bookmarks" | "likes" | "retweets";
    isAdding: boolean;
  }) => Promise<string | any[] | undefined>;
};

const TweetInfos = ({ tweet, handleUpdateInfos }: Props) => {
  const router = useRouter();
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
        router.push(`/tweets/${tweet._id}`);
        break;
      case "retweet":
        if (tweet.retweets.includes(user._id)) {
          handleUpdateInfos({
            tweetID: tweet._id,
            isAdding: false,
            title: "retweets",
            userID: user._id,
          });
        } else {
          handleUpdateInfos({
            tweetID: tweet._id,
            isAdding: true,
            title: "retweets",
            userID: user._id,
          });
        }
        break;
      case "like":
        if (tweet.likes.includes(user._id)) {
          handleUpdateInfos({
            tweetID: tweet._id,
            isAdding: false,
            title: "likes",
            userID: user._id,
          });
        } else {
          handleUpdateInfos({
            tweetID: tweet._id,
            isAdding: true,
            title: "likes",
            userID: user._id,
          });
        }
        break;
      case "save":
        if (tweet.bookmarks.includes(user._id)) {
          handleUpdateInfos({
            tweetID: tweet._id,
            isAdding: false,
            title: "bookmarks",
            userID: user._id,
          });
        } else {
          handleUpdateInfos({
            tweetID: tweet._id,
            isAdding: true,
            title: "bookmarks",
            userID: user._id,
          });
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
          [
            "comment",
            <OutlineCommentIcon />,
            tweet.comments,
            "!text-primary",
          ] as [string, JSX.Element, Comment[], string],
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
                user && title !== "comment" && array?.includes(user._id) && color
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
                    ? array?.length
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
