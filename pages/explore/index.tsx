import { ReactElement, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

// Components
import Filter from "../../components/explore/Filter";
import Searchbar from "../../components/explore/Searchbar";
import Layout from "../../components/layouts/Layout";
import Feed from "../../components/feed/Feed";
import PeopleFeed from "../../components/explore/PeopleFeed";
// Hooks
import useTweet, { key } from "../../utils/explore/useTweets";
import { useRouter } from "next/router";
import useInfiniteTweet from "../../utils/explore/useInfiniteTweets";
// Types

const Index = () => {
  const router = useRouter();
  const [filter, setfilter] = useState<"lastest" | "top" | "people" | "media">(
    "lastest"
  );
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setInput(router.query.query as string);
  }, [router.query.query]);

  const {
    tweets,
    tweetsIsError,
    tweetsIsLoading,
    setSize,
    tweetsIsReachingEnd,
    tweetsIsEmpty,
    handleUpdateInfos,
  } = useInfiniteTweet(filter, input, 10);

  console.log("on render explore log twweets =>", tweets);

  return (
    <div className="p-4 w-full flex flex-col lg:flex-row lg:items-start lg:justify-center ">
      <div className="lg:mr-2">
        <Filter filter={filter} setFilter={setfilter} />
      </div>
      <div className="lg:ml-2 w-full lg:max-w-4xl mb-14 md:mb-0 ">
        <Searchbar input={input} setInput={setInput} />

        {tweetsIsLoading ? (
          <div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
            <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
          </div>
        ) : tweetsIsError ? (
          <p>Error {tweetsIsError} </p>
        ) : filter === "people" ? (
          <PeopleFeed
            isEmpty={tweetsIsEmpty}
            isReachingEnd={tweetsIsReachingEnd}
            setSize={setSize}
            input={input}
            peoples={tweets}
          />
        ) : (
          <Feed
            handleUpdateInfos={handleUpdateInfos}
            isEmpty={tweetsIsEmpty}
            isReachingEnd={tweetsIsReachingEnd}
            setSize={setSize}
            tweets={tweets?.length > 0 ? tweets : []}
          />
        )}
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
