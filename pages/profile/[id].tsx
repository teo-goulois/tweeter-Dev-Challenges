import { useRouter } from "next/router";
import React, { useState } from "react";
// Components
import Filter from "../../components/bookmarks/Filter";
import Feed from "../../components/feed/Feed";
import ProfileInfos from "../../components/profile/ProfileInfos";
// Hooks
import useUser from "../../utils/users/useUser";
import useTweet from "../../utils/profile/useTweets";
import { key } from "../../utils/profile/useTweets";
import useInfiniteTweet from "../../utils/profile/useInfiniteTweets";

const Profile = () => {
  const router = useRouter();
  const { user, isLoading, isError } = useUser(router.query.id as string);
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

  return (
    <div className="">
      <ProfileInfos user={user} />
      <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center">
        <div className="max-w-[1450px] w-full">
          <div className="w-full flex flex-col lg:flex-row ">
            <Filter filter={filter} setFilter={setFilter} />
            <div className="w-full lg:ml-4 mb-14 md:mb-0">
              {tweetsIsLoading ? (
                <div>
                  <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
                  <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
                  <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
                </div>
              ) : tweetsIsError ? (
                <p>Error {isError} </p>
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
    </div>
  );
};

export default Profile;
