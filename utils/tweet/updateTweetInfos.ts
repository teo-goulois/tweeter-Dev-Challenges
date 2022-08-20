import toast from "react-hot-toast";
import { mutate } from "swr";
import { Tweet } from "../../types/typing";
import { key } from "./useTweets";

export default async function updateTweetInfos(
  userID: string,
  tweetID: string,
  title: "bookmarks" | "likes" | "retweets",
  url: string,
  isAdding: boolean
) {
  if (isAdding) {
    return mutate(
      key(tweetID),
      async (data: { tweet: Tweet; message: string }) => {
        const { tweet } = data;
        console.log(tweet, "TWEETS");
        // fetch add like
        const response = await fetch(url);
        // if success
        if (response.status === 200) {
          tweet[title] = [...tweet[title], userID];
          return { ...data, tweet };
        }
        toast.error("an error occured please try again later.");
      },
      {
        revalidate: true,
      }
    );
  } else {
    return mutate(
      key(tweetID),
      async (data: { tweet: Tweet; message: string }) => {
        const { tweet } = data;
        // fetch remove
        const response = await fetch(url);
        // if success
        if (response.status === 200) {
          tweet[title] = tweet[title].filter((id: string) => id !== userID);
          return { ...data, tweet };
        }
        toast.error("an error occured please try again later.");
      },
      {
        revalidate: true,
      }
    );
  }
}
