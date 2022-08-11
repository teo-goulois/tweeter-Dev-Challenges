import type { GetServerSideProps, NextPage } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect } from "react";
// Components
import CreateTweet from "../components/createTweet/CreateTweet";
import Feed from "../components/feed/Feed";
import { TweetContext } from "../context/TweetProvider";
import { Tweet } from "../types/typing";
import { fetchTweets } from "../utils/fetchTweets";

type Props = {
  tweets: Tweet[];
  providers: Provider;
};

const Home = ({ providers, tweets }: Props) => {
  const { data: session } = useSession();
  const { setTweets } = useContext(TweetContext);
  console.log(session, "SESSION");
  console.log(tweets, "tweets");
  /*  
  console.log(providers, 'PROVIDERs');
 */
  // useEffect
  useEffect(() => {
    setTweets(tweets);
  }, [tweets]);
  return (
    <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center ">
      <Head>
        <title>tweeter</title>
      </Head>
      <div className="w-full md:min-w-[65%]">
        <CreateTweet />
        <Feed />
      </div>
      <div className="hidden md:block ml-2"></div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const tweets = await fetchTweets();

  return {
    props: { providers, tweets },
  };
};
