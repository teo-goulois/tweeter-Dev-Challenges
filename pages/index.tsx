import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { useEffect } from "react";
// Components
import CreateTweet from "../components/createTweet/CreateTweet";
import FollowSugestion from "../components/desktop/followSugestion";
import Trend from "../components/desktop/Trend";
import Feed from "../components/feed/Feed";
// data relatives
import useInfiniteTweet from "../utils/home/useInfiniteTweets";
import useConnectedUser from "../utils/users/useConnectedUser";
// types
import { authOptions } from "./api/auth/[...nextauth]";
// Hooks

type Props = {};

const Home = ({}: Props) => {
  const { user } = useConnectedUser();

  const {
    tweets,
    tweetsIsError,
    tweetsIsLoading,
    setSize,
    tweetsIsReachingEnd,
    tweetsIsEmpty,
    handleUpdateInfos,
    mutate,
    uploadTweet
  } = useInfiniteTweet(user?._id, user?.following, 10);

  // fetch whan current user following change
  useEffect(() => {
    mutate();
  }, [user?.following]);

  return (
    <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center ">
      <Head>
        <title>tweeter</title>
      </Head>
      <div className=" w-full lg:max-w-4xl  mb-14 md:mb-0">
        <CreateTweet uploadTweet={uploadTweet} />
        {tweetsIsLoading ? (
          <div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
          </div>
        ) : tweetsIsError ? (
          <p>Error {tweetsIsError} </p>
        ) : (
          <Feed
            tweets={tweets}
            handleUpdateInfos={handleUpdateInfos}
            isEmpty={tweetsIsEmpty}
            isReachingEnd={tweetsIsReachingEnd}
            setSize={setSize}
          />
        )}
      </div>
      <div className="hidden md:block ml-2 ">
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
