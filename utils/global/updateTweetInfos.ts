import user from "pusher-js/types/src/core/user";
import toast from "react-hot-toast";
import { KeyedMutator, mutate, MutatorCallback, MutatorOptions } from "swr";
import tweets from "../../pages/api/bookmarks/tweets";
import { Tweet } from "../../types/typing";
type Props = {
  key: string | (string | { method: string; body: string })[] | null;
  userID: string;
  following: string[];
  tweetID: string;
  title: "bookmarks" | "likes" | "retweets";
  url: string;
  isAdding: boolean;
};

export default async function updateTweetInfos({
  key,
  isAdding,
  url,
  tweetID,
  userID,
  title,
}: Props) {
  if (isAdding) {
    return mutate(key, async (tweets: Tweet[]) => {
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
    return mutate(key, async (tweets: Tweet[]) => {
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

export const handleClickTest = (
  tweetID: string,
  mutate: KeyedMutator<any[]>,
  tweets: any[]

) => {
  mutate((t) => {
    return tweets
 /*    let newIssue = tweets.find((item) => item._id === tweetID);
    if (!newIssue) return;
    newIssue.likes = [...newIssue.likes, user?._id];
    console.log(newIssue.likes, "newIssues");
    return tweets; */
  }, false);
};
