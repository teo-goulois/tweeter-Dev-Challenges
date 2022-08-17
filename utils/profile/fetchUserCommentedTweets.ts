import { Tweet } from "../../types/typing";

export const fetchUserCommentedTweets = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getUserCommentedTweets?userID=${userID}`
  );
  const data = await res.json();

  const userCommentedTweets: Tweet[] = data.userCommentedTweets;
  
  return userCommentedTweets;
};
