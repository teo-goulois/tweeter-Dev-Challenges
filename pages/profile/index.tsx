import { ReactElement, useContext, useState } from "react";
import Head from "next/head";
import useSWR from "swr";
// Components
import Tweet from "../../components/tweet/Tweet";
import Layout from "../../components/layouts/Layout";
import Filter from "../../components/profile/Filter";
import ProfileInfos from "../../components/profile/ProfileInfos";
import CreateTweet from "../../components/createTweet/CreateTweet";
// Context
import { AuthContext } from "../../context/AuthProvider";
import type { NextPageWithLayout } from "../_app";
import { TweetContext } from "../../context/TweetProvider";
import Feed from "../../components/feed/Feed";
import useConnectedUser from "../../utils/home/useConnectedUser";

const Index: NextPageWithLayout = () => {
  // const { user } = useContext(AuthContext);
  const {user} = useConnectedUser()
  const { setTweets, tweets } = useContext(TweetContext);

  if (!user) return <div></div>;
  return (
    <div className="">
      <Head>
        <title>tweeter - profile</title>
      </Head>

      <ProfileInfos user={user} />
      <div className="p-4 w-full flex flex-col md:flex-row md:items-start md:justify-center  items-center">
        <div className="max-w-[1450px] w-full">
          <div className="w-full flex flex-col lg:flex-row ">
            <Filter setTweets={setTweets} />
            <CreateTweet />
          </div>
          <div className="">
            <Feed tweets={tweets} textIfNoTweets={"No Tweets found"} />
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
