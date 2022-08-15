import { ReactElement, useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";

// Components
import Filter from "../../components/bookmarks/Filter";
import Searchbar from "../../components/explore/Searchbar";
import Layout from "../../components/layouts/Layout";
import Feed from "../../components/feed/Feed";
// Hooks
import { fetchTweets } from "../../utils/fetchTweets";
// Types
import { Tweet as TweetType } from "../../types/typing";
import { TweetContext } from "../../context/TweetProvider";
import { fetchSavedTweets } from "../../utils/bookmarks/fetchSavedTweets";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import useSWR from "swr";
import { AuthContext } from "../../context/AuthProvider";

type Props = {
  fetchTweets: TweetType[];
};

const Index = ({ fetchTweets }: Props) => {
  const { setTweets, tweets } = useContext(TweetContext);
  const { user } = useContext(AuthContext);

  const { data, error } = useSWR(
    `/api/tweets/getSavedTweets?userID=${user?._id}`
  );

  // useEffect
  useEffect(() => {
    data && setTweets(data.savedTweets);
    return () => {
      setTweets([]);
    };
  }, [data]);

  return (
    <div className="p-4 w-full flex flex-col lg:flex-row lg:items-start lg:justify-center ">
      <div className="block lg:mr-2">
        <Filter setTweets={setTweets} />
      </div>
      <div className="lg:ml-2 md:min-w-[60%] lg:min-w-[40%] ">
        {data ? (
          <Feed
            tweets={tweets}
            textIfNoTweets="no tweets saved, save one to start see them"
          />
        ) : (
          <div>
            <div className="w-full h-[200px] bg-gray4 animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[200px] bg-gray4 animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[200px] bg-gray4 animate-pulse rounded-xl mb-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
