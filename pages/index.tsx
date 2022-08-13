import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
// Components
import CreateTweet from "../components/createTweet/CreateTweet";
import Feed from "../components/feed/Feed";
// Context
import { TweetContext } from "../context/TweetProvider";
// types
import { Tweet } from "../types/typing";
// Hooks
import { fetchTweets } from "../utils/fetchTweets";

type Props = {
  tweets: Tweet[];
};

const Home = ({ tweets }: Props) => {
  const { setTweets, tweets: tweetContext } = useContext(TweetContext);

  // useEffect
  useEffect(() => {
    setTweets(tweets);
  }, [tweets]);

  return (
    <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center ">
      <Head>
        <title>tweeter</title>
      </Head>
      <div className="w-full md:min-w-[65%] mb-14 md:mb-0">
        <CreateTweet />
        <Feed tweets={tweetContext} />
      </div>
      <div className="hidden md:block ml-2"></div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: { tweets },
  };
};
