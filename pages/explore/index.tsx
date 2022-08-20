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
import { Tweet, Tweet as TweetType } from "../../types/typing";
import { TweetContext } from "../../context/TweetProvider";
import useTweet from "../../utils/explore/useTweets";
import PeopleCard from "../../components/explore/PeopleCard";
import PeopleFeed from "../../components/explore/PeopleFeed";

const Index = () => {
  const [filter, setfilter] = useState<"lastest" | "top" | "people" | "media">(
    "lastest"
  );
  const [input, setInput] = useState<string>("");
  const { tweets, isError, isLoading } = useTweet(filter, input);

  return (
    <div className="p-4 w-full flex flex-col lg:flex-row lg:items-start lg:justify-center ">
      <div className="block lg:mr-2">
        <Filter filter={filter} setFilter={setfilter} />
      </div>
      <div className="lg:ml-2 md:min-w-[60%] lg:min-w-[40%] ">
        <Searchbar input={input} setInput={setInput} />

        {!isLoading ? (
          filter === "people" ? (
            <PeopleFeed input={input} peoples={tweets} />
          ) : (
            <Feed tweets={tweets} />
          )
        ) : isError ? (
          <p>Error {isError} </p>
        ) : (
          <div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
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
