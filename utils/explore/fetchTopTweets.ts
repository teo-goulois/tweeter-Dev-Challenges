import { Tweet } from "../../types/typing";

export const fetchTopTweets = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getTopTweets`
  );
  const data = await res.json();
  const topTweets: Tweet[] = data.topTweets;
  return topTweets;
};
