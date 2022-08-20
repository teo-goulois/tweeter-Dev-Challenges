import toast from "react-hot-toast";
import { mutate } from "swr";
import { Tweet } from "../../types/typing";
import { key } from "./useTweets";

export default async function updateTweetInfos(
  userID: string,
  field: "lastest" | "top" | "people" | "media",
  query: string,
  tweetID: string,
  title: "bookmarks" | "likes" | "retweets",
  url: string,
  isAdding: boolean
) {
  if (isAdding) {
    return mutate(key(field, query), async (tweets: Tweet[]) => {
      // fetch add like
      const response = await fetch(url);
      // if success
      if (response.status === 200) {
        let newTweet = tweets.find((item: Tweet) => item._id === tweetID);
        if (!newTweet) return toast.error("tweet not found");
        newTweet[title] = [...newTweet[title], userID];
        return tweets;
      }
      toast.error("an error occured please try again later.");
    });
  } else {
    return mutate(key(field, query), async (tweets: Tweet[]) => {
      // fetch remove
      const response = await fetch(url);
      // if success
      if (response.status === 200) {
        let newTweet = tweets.find((item) => item._id === tweetID);
        if (!newTweet) return toast.error("tweet not found");
        newTweet[title] = newTweet[title].filter((id: string) => id !== userID);
        return tweets;
      }
      toast.error("an error occured please try again later.");
    });
  }
}
