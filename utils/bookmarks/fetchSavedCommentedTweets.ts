import { Tweet } from "../../types/typing";

export const fetchSavedCommentedTweets = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getSavedCommentedTweets?userID=${userID}`
  );
  const data = await res.json();

  const savedCommentedTweets: Tweet[] = data.savedCommentedTweets;
  return savedCommentedTweets;
};
