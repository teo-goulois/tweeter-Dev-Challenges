import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { useEffect, useState } from "react";
import { mutate } from "swr";
// Components
import CreateTweet from "../components/createTweet/CreateTweet";
import FollowSugestion from "../components/desktop/followSugestion";
import Trend from "../components/desktop/Trend";
import Feed from "../components/feed/Feed";
import { Tweet } from "../types/typing";
// types
// Hooks
import useTweet, { key } from "../utils/home/useTweets";
import useConnectedUser from "../utils/users/useConnectedUser";
import { authOptions } from "./api/auth/[...nextauth]";

type Props = {};

const Home = ({}: Props) => {
  const { user } = useConnectedUser();

  const { tweets, isLoading, isError } = useTweet(
    user?._id,
    user?.following
  );


  

  // fetch whan current user following change
  useEffect(() => {
    mutate((...args) => key(...args, user?._id, user?.following));
  }, [user?.following]);

  return (
    <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center ">
      <Head>
        <title>tweeter</title>
      </Head>
      <div className=" w-full lg:max-w-4xl  mb-14 md:mb-0">
        <CreateTweet />
        {isLoading ? (
          <div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
          </div>
        ) : isError ? (
          <p>Error {isError} </p>
        ) : (
          <Feed
            swrKey={key(user?._id, user?.following)}
            tweets={tweets}
            url="/api/home/getTweets?"
          />
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
