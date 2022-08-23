import { ReactElement, useEffect, useState } from "react";

// Components
import Filter from "../../components/explore/Filter";
import Searchbar from "../../components/explore/Searchbar";
import Layout from "../../components/layouts/Layout";
import Feed from "../../components/feed/Feed";
import PeopleFeed from "../../components/explore/PeopleFeed";
// Hooks
import useTweet, { key } from "../../utils/explore/useTweets";
import { useRouter } from "next/router";
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

  const { tweets, isError, isLoading } = useTweet(filter, input);

  return (
    <div className="p-4 w-full flex flex-col lg:flex-row lg:items-start lg:justify-center ">
      <div className="lg:mr-2">
        <Filter filter={filter} setFilter={setfilter} />
      </div>
      <div className="lg:ml-2 w-full lg:max-w-4xl ">
        <Searchbar input={input} setInput={setInput} />

        {!isLoading ? (
          filter === "people" ? (
            <PeopleFeed input={input} peoples={tweets} />
          ) : (
            <Feed tweets={tweets} swrKey={key(filter, input)} />
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
