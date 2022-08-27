import { ReactElement, useState } from "react";
import Head from "next/head";
// Components
import Layout from "../../components/layouts/Layout";
import Filter from "../../components/profile/Filter";
import ProfileInfos from "../../components/profile/ProfileInfos";
import CreateTweet from "../../components/createTweet/CreateTweet";
import Feed from "../../components/feed/Feed";
// Types
import type { NextPageWithLayout } from "../_app";
// Hooks
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";
import useInfiniteTweet from "../../utils/profile/useInfiniteTweets";

const Index: NextPageWithLayout = () => {
  const { user } = useConnectedUser();
  const [filter, setFilter] = useState<
    "tweets" | "replies" | "media" | "likes"
  >("tweets");

  const {
    tweets,
    tweetsIsError,
    tweetsIsLoading,
    handleUpdateInfos,
    setSize,
    tweetsIsEmpty,
    tweetsIsReachingEnd,
  } = useInfiniteTweet(user?._id, filter, 10);

  if (!user) return <div></div>;
  return (
    <div className="">
      <Head>
        <title>tweeter - profile</title>
      </Head>

      <ProfileInfos user={user} />
      <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center">
        <div className="max-w-[1450px] w-full">
          <div className="w-full flex flex-col lg:flex-row mb-2 ">
            <Filter filter={filter} setFilter={setFilter} />
            <CreateTweet fromProfile={true} filter={filter} />
          </div>
          <div className="mb-14 md:mb-0">
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
                handleUpdateInfos={handleUpdateInfos}
                isEmpty={tweetsIsEmpty}
                isReachingEnd={tweetsIsReachingEnd}
                setSize={setSize}
                tweets={tweets}
                textIfNoTweets={"No Tweets found"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
