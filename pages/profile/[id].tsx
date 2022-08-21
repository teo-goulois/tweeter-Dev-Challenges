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

const Profile = () => {
  const router = useRouter();
  const { user, isLoading, isError } = useUser(router.query.id as string);
  const [filter, setFilter] = useState<
    "tweets" | "replies" | "media" | "likes"
  >("tweets");
  const { tweets } = useTweet(user?._id, filter);


  if (isLoading) return <p>loading...</p>;
  return (
    <div className="">
      <ProfileInfos user={user} />
      <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center">
        <div className="max-w-[1450px] w-full">
          <div className="w-full flex flex-col lg:flex-row ">
            <Filter filter={filter} setFilter={setFilter} />
            <div className="w-full ml-4">
              <Feed swrKey={key(user?._id, filter)} tweets={tweets} textIfNoTweets={"No Tweets found"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
