import { ReactElement, useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";

// Components
import Filter from "../../components/explore/Filter";
import Searchbar from "../../components/explore/Searchbar";
import Layout from "../../components/layouts/Layout";
import Feed from "../../components/feed/Feed";
// Hooks
import { fetchTweets } from "../../utils/fetchTweets";
// Types
import { Tweet as TweetType } from "../../types/typing";
import { TweetContext } from "../../context/TweetProvider";

type Props = {
  fetchTweets: TweetType[];
};

const Index = ({ fetchTweets }: Props) => {
  const { setTweets, tweets } = useContext(TweetContext);

  // useEffect
  useEffect(() => {
    setTweets(fetchTweets);
  }, [fetchTweets]);
  
  return (
    <div className="p-4 w-full flex flex-col lg:flex-row lg:items-start lg:justify-center ">
      <div className="block lg:mr-2">
        <Filter setTweets={setTweets} />
      </div>
      <div className="lg:ml-2">
        <Searchbar />
        <Feed tweets={tweets} />
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: { fetchTweets: tweets },
  };
};
