import React from "react";
import { useRouter } from "next/router";
// Types
// Component
import TweetComponent from "../../components/singleTweet/index";
// Hooks
import useTweet from "../../utils/tweet/useTweets";

type Props = {};

const Tweet = ({}: Props) => {
  const router = useRouter();

  const { tweet, isLoading, isError } = useTweet(router.query.id as string);

  return (
    <div className="p-2 flex justify-center">
      {isLoading && (
        <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
      )}
      {isError && <p>Error: {isError} </p>}
      {tweet && <TweetComponent tweet={tweet} />}
    </div>
  );
};

export default Tweet;
