import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TailSpin } from "react-loader-spinner";
// Components
import Tweet from "../tweet/Tweet";
// Type
import { Tweet as TweetType } from "../../types/typing";
import { mutate } from "swr";
import { key } from "../../utils/home/useTweets";
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {
  tweets: TweetType[];
  textIfNoTweets?: string;
  swrKey: string | (string | { method: string; body: string })[] | null;
  url: string;
};

const Feed = ({ tweets, textIfNoTweets, swrKey, url }: Props) => {
  const { user } = useConnectedUser();
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const handleFetch = () => {
    mutate(
      swrKey,
      async (temptweets: TweetType[]) => {
        const response = await fetch(`${url}page=${(page + 1) * 10}`, {
          method: "POST",
          body: JSON.stringify({
            _id: user?._id,
            following: user?.following,
          }),
        });
        const data = await response.json();
        if (data.length === 0) {
          setHasEnded(true);
        }
        const temp = [...temptweets, ...data];

        if (response.status === 200) {
          return temp;
        }
      },
      { revalidate: false }
    );
    setPage((prev) => prev + 1);
  };

  return (
    <div className="h-full w-5xl relative">
      <InfiniteScroll
        dataLength={tweets.length}
        next={handleFetch}
        hasMore={tweets.length === 0 ? false : !hasEnded}
        loader={
          <div className="w-full flex justify-center">
            <TailSpin
              height="40"
              width="40"
              color="blue"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass="" 
              visible={true}
            />
          </div>
        }
        endMessage={
          tweets.length === 0 ? null : (
            <div className="w-full flex justify-center">
              <p className="text-secondary">no more tweets</p>
            </div>
          )
        }
        className="scrollbar-none"
      >
        {tweets?.length > 0 ? (
          tweets.map((tweet, index) => {
            return <Tweet swrKey={swrKey} key={tweet._id} tweet={tweet} />;
          })
        ) : (
          <div className="bg-white py-2 rounded-lg shadow-sm">
            <p className="text-primary font-semibold text-center text-lg">
              {textIfNoTweets ?? "no tweets yet create one"}{" "}
            </p>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
