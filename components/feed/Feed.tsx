import React, { useContext, useEffect } from "react";
// Components
import Tweet from "../tweet/Tweet";
// Type
import { Tweet as TweetType } from "../../types/typing";

type Props = {
  tweets: TweetType[];
  textIfNoTweets?: string;
};

const Feed = ({ tweets, textIfNoTweets }: Props) => {
  return (
    <div className="h-full w-full">
      {tweets?.length > 0 ? (
        tweets.map((tweet, index) => {
          return <Tweet key={tweet._id} tweet={tweet} />;
        })
      ) : (
        <div className="bg-white py-2 rounded-lg shadow-sm">
          <p className="text-primary font-semibold text-center text-lg">{textIfNoTweets ?? "no tweets yet create one"} </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
