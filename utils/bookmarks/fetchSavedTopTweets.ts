import { Tweet } from "../../types/typing";

export const fetchSavedTopTweets = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getSavedTopTweets?userID=${userID}`
  );
  const data = await res.json();
  const savedTopTweets: Tweet[] = data.savedTopTweets;
  return savedTopTweets;
};
