import { Head } from "next/document";
import { useRouter } from "next/router";
import React from "react";
// Components
import Filter from "../../components/bookmarks/Filter";
import CreateTweet from "../../components/createTweet/CreateTweet";
import Feed from "../../components/feed/Feed";
import ProfileInfos from "../../components/profile/ProfileInfos";
import useConnectedUser from "../../utils/home/useConnectedUser";
import useUser from "../../utils/home/useUser";
import useTweet from "../../utils/profile/useTweets";

const Profile = () => {
  const router = useRouter();
  const { user, isLoading, isError } = useUser(router.query.id as string);
  console.log(user, 'profile user');
  
  const { tweets } = useTweet(user?._id);

  if (isLoading) return <p>loading...</p>;
  return (
    <div className="">
    

      <ProfileInfos user={user} />
      <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center">
        <div className="max-w-[1450px] w-full">
          <div className="w-full flex flex-col lg:flex-row ">
            <Filter setTweets={() => {}} />
          </div>
          <div className="">
            <Feed tweets={tweets} textIfNoTweets={"No Tweets found"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
