import { Tweet } from "../types/typing";

export const fetchTweet = async (tweetID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getTweet?tweetID=${tweetID}`
  );
  const data = await res.json();
  const tweet: Tweet = data.tweet;
  console.log("fetchtweet", tweet);

  return tweet;
};
