import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useContext, useEffect } from "react";
import useSWR from "swr";
// Components
import CreateTweet from "../components/createTweet/CreateTweet";
import FollowSugestion from "../components/desktop/followSugestion";
import Trend from "../components/desktop/Trend";
import Feed from "../components/feed/Feed";
import { AuthContext } from "../context/AuthProvider";
// Context
import { TweetContext } from "../context/TweetProvider";
// types
import { Tweet } from "../types/typing";
import { fetchHomeTweets } from "../utils/fetchHomeTweets";
// Hooks
import { fetchTweets } from "../utils/fetchTweets";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage = () => {
  const { setTweets, tweets } = useContext(TweetContext);
  const { user } = useContext(AuthContext);

  const { data, error } = useSWR([
    `/api/tweets/getHomeTweets`,
    {
      body: JSON.stringify({
        following: user?.following,
      }),
      method: "POST",
    },
  ]);

  // useEffect
  useEffect(() => {
    data && setTweets(data.tweets);
    return () => {
      console.log("CLEAR");

      setTweets([]);
    };
  }, [data]);

  return (
    <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center ">
      <Head>
        <title>tweeter</title>
      </Head>
      <div className="w-full md:max-w-[60%] lg:max-w-[50%] md:min-w-[45%] mb-14 md:mb-0">
        <CreateTweet />
        {data ? (
          <Feed tweets={tweets} />
        ) : (
          <div>
            <div className="w-full h-[200px] bg-gray4 animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[200px] bg-gray4 animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[200px] bg-gray4 animate-pulse rounded-xl mb-4"></div>
          </div>
        )}
      </div>
      <div className="hidden md:block ml-2">
        <Trend />
        <FollowSugestion />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
