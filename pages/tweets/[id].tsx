import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Comment } from "../../types/typing";
import { fetchComments } from "../../utils/fetchComments";
import useSWR from "swr";

// Component
import TweetComponent from "../../components/singleTweet/index";
import { TweetContext } from "../../context/TweetProvider";
import { fetchTweet } from "../../utils/fetchTweet";
import useTweet from "../../utils/tweet/useTweets";
type Props = {
  comments: Comment[];
};

const Tweet = ({ comments }: Props) => {
  const router = useRouter();

  const { tweet, isLoading, isError } = useTweet(router.query.id as string);


  return (
    <div className="p-2">
      {isLoading && (
        <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
      )}
      {isError && <p>Error: {isError} </p>}
      {tweet && <TweetComponent tweet={tweet} />}
    </div>
  );
};

export default Tweet;

