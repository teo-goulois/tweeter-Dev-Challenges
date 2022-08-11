import React, { useContext } from "react";
import { TweetContext } from "../../context/TweetProvider";
import Tweet from "../tweet/Tweet";

const Feed = () => {
  const { tweets } = useContext(TweetContext);
  console.log(tweets, 'TWEETS');
  
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
