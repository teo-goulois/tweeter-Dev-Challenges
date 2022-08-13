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
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const tweets = await fetchSavedTweets(session?.user._id);

  return {
    props: { fetchTweets: tweets },
  };
};
