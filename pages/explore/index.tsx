import { ReactElement, useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import useSWR from "swr";

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



const Index = () => {
  const { setTweets, tweets } = useContext(TweetContext);
  const { data, error } = useSWR("/api/tweets/getTweets");

  const [input, setInput] = useState<string>('')

  // useEffect
 /*  useEffect(() => {
    data && console.log(data.tweets, 'EXPLORE TWEETS');
    data && setTweets(data.tweets);
    
    return () => {
      console.log("CLEAR");

      //setTweets([]);
    };
  }, [data]); */

  return (
    <div className="p-4 w-full flex flex-col lg:flex-row lg:items-start lg:justify-center ">
      <div className="block lg:mr-2">
        <Filter setTweets={setTweets} />
      </div>
      <div className="lg:ml-2 md:min-w-[60%] lg:min-w-[40%] ">
        <Searchbar input={input} setInput={setInput} />
        {data ? (
          <Feed tweets={tweets} />
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


