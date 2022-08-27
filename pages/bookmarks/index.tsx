import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
// Components
import Filter from "../../components/bookmarks/Filter";
import Feed from "../../components/feed/Feed";
// Hooks
// Types
import { authOptions } from "../api/auth/[...nextauth]";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";
import useInfiniteTweet from "../../utils/bookmarks/useInfiniteTweets";

const Index: NextPage = () => {
  const { user } = useConnectedUser();
  const [filter, setFilter] = useState<
    "tweets" | "replies" | "media" | "likes"
  >("tweets");

  const {
    tweets,
    tweetsIsError,
    tweetsIsLoading,
    setSize,
    tweetsIsReachingEnd,
    tweetsIsEmpty,
    handleUpdateInfos,
  } = useInfiniteTweet(filter, user?._id, 10);

  return (
    <div className="p-4 w-full flex flex-col lg:flex-row lg:items-start lg:justify-center ">
      <div className="block lg:mr-2">
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <div className="lg:ml-2 md:min-w-[60%] lg:min-w-[40%] ">
        {tweetsIsLoading ? (
          <div>
            <div className="w-full h-[200px] bg-gray4 animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[200px] bg-gray4 animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[200px] bg-gray4 animate-pulse rounded-xl mb-4"></div>
          </div>
        ) : tweetsIsError ? (
          <p>Error </p>
        ) : (
          <Feed
            handleUpdateInfos={handleUpdateInfos}
            isEmpty={tweetsIsEmpty}
            isReachingEnd={tweetsIsReachingEnd}
            setSize={setSize}
            tweets={tweets.length > 0 ? tweets : []}
            textIfNoTweets="no tweets saved, save one to start see them"
          />
        )}
      </div>
    </div>
  );
};

export default Index;

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
