import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TailSpin } from "react-loader-spinner";
// Components
import Tweet from "../tweet/Tweet";
// Type
import { Tweet as TweetType } from "../../types/typing";
import { KeyedMutator, mutate } from "swr";
import { key } from "../../utils/home/useTweets";
import useConnectedUser from "../../utils/users/useConnectedUser";
import { handleClickTest } from "../../utils/global/updateTweetInfos";
import useInfiniteTweet from "../../utils/explore/useInfiniteTweets";

type Props = {
  tweets: TweetType[];
  textIfNoTweets?: string;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<any[] | undefined>;
  isEmpty: boolean;
  isReachingEnd: boolean | undefined;
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

const Feed = ({
  tweets,
  textIfNoTweets,
  setSize,
  isReachingEnd,
  isEmpty,
  handleUpdateInfos
}: Props) => {
  const { user } = useConnectedUser();
  const handleFetch = () => {
    setSize((prev) => prev + 1);
  };

  return (
    <div className="h-full w-5xl relative">
      <InfiniteScroll
        dataLength={tweets ? tweets.length : 0}
        next={handleFetch}
        hasMore={!isReachingEnd ?? false}
        loader={
          <div className="w-full flex justify-center">
            <TailSpin
              height="40"
              width="40"
              color="blue"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        }
        endMessage={
          !isEmpty && (
            <div className="w-full flex justify-center">
              <p className="text-secondary">no more tweets</p>
            </div>
          )
        }
        className="scrollbar-none"
      >
        {!isEmpty ? (
          tweets.map((tweet, index) => {
            return <Tweet  handleUpdateInfos={handleUpdateInfos} key={tweet._id} tweet={tweet} />;
          })
        ) : (
          <div className="bg-white py-2 rounded-lg shadow-sm">
            <p className="text-primary font-semibold text-center text-lg">
              {textIfNoTweets ?? "no tweets yet create one"}{" "}
            </p>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
