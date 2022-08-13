import { Tweet } from "../../types/typing";

export const fetchSavedMediaTweets = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getSavedMediaTweets?userID=${userID}`
  );
  const data = await res.json();
  const savedMediaTweets: Tweet[] = data.savedMediaTweets;
  return savedMediaTweets;
};
