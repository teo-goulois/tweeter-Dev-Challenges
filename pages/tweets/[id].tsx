import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Comment, Tweet } from "../../types/typing";
import { fetchComments } from "../../utils/fetchComments";
import useSWR from "swr";

// Component
import TweetComponent from "../../components/tweet/SingleTweet";
import { TweetContext } from "../../context/TweetProvider";
import { fetchTweet } from "../../utils/fetchTweet";
type Props = {
  comments: Comment[];
};

const Tweet = ({ comments }: Props) => {
  const router = useRouter();
  const { setActiveTweet } = useContext(TweetContext);
  const { data, error } = useSWR(
    `/api/tweets/getTweet?tweetID=${router.query.id}`
  );

  const [currentTweet, setCurrentTweet] = useState<Tweet>();

  useEffect(() => {
    // fetch tweet
    if (data) {
      data && console.log(data.tweet[0]);
      setActiveTweet(data.tweet[0]);
      data && setCurrentTweet(data.tweet[0]);
    }
  }, [data]);

  return (
    <div className="p-2">
      {currentTweet ? (
        <TweetComponent
          tweet={currentTweet}
          setCurrentTweet={setCurrentTweet}
        />
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Tweet;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    const tweetID = context.params.id;
    return {
      props: {},
    };
  }

  return {
    props: {},
  };
};
