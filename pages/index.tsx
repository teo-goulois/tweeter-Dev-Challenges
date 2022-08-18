import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useContext, useEffect } from "react";
import useSWR, { mutate } from "swr";
// Components
import CreateTweet from "../components/createTweet/CreateTweet";
import FollowSugestion from "../components/desktop/followSugestion";
import Trend from "../components/desktop/Trend";
import Feed from "../components/feed/Feed";
import { AuthContext } from "../context/AuthProvider";
// Context
import { TweetContext } from "../context/TweetProvider";
// types
import { Tweet, User } from "../types/typing";
import { fetchHomeTweets } from "../utils/fetchHomeTweets";
// Hooks
import { fetchTweets } from "../utils/fetchTweets";
import useTweet from "../utils/home/useTweets";
import useUser from "../utils/home/useUser";
import { authOptions } from "./api/auth/[...nextauth]";

type Props = {};

const Home = ({}: Props) => {
  const { user } = useUser();
  const { tweets, isLoading, isError } = useTweet(user?._id, user?.following);

  // fetch whan current user following change
  useEffect(() => {
    console.log(user, "user change ");
    mutate(
      user?._id
        ? [
            `/api/home/getTweets`,
            {
              method: "POST",
              body: JSON.stringify({
                _id: user._id,
                following: user.following,
              }),
            },
          ]
        : null
    );
  }, [user?.following]);

  return (
    <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center ">
      <Head>
        <title>tweeter</title>
      </Head>
      <div className="w-full md:max-w-[60%] lg:max-w-[50%] md:min-w-[45%] mb-14 md:mb-0">
        <CreateTweet />
        {!isLoading ? (
          <Feed tweets={tweets} />
        ) : isError ? (
          <p>Error {isError} </p>
        ) : (
          <div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
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
