import React, { useContext, useEffect } from "react";
// Components
import Tweet from "../tweet/Tweet";
// Type
import { Tweet as TweetType } from "../../types/typing";

type Props = {
  tweets: TweetType[];
};

const Feed = ({ tweets }: Props) => {
  return (
    <div className="h-full w-full">
      {tweets?.length > 0 ? (
        tweets.map((tweet, index) => {
          return <Tweet key={tweet._id} tweet={tweet} />;
        })
      ) : (
        <div>no tweets yet create one</div>
      )}
    </div>
  );
};

export default Feed;
