import { Tweet } from "../../types/typing";

export const fetchSavedTweets = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getSavedTweets?userID=${userID}`
  );
  const data = await res.json();
  const savedTweets: Tweet[] = data.savedTweets;
  return savedTweets;
};
