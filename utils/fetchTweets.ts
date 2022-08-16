import { Tweet } from "../types/typing";

export const fetchTweets = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getTweets`
  );
  const data = await res.json();
  const tweets: Tweet[] = data.tweets;
  console.log(tweets);

  return tweets;
};
