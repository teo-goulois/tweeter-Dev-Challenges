import { Tweet } from "../../types/typing";

export const fetchUserTweets = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getUserTweets?userID=${userID}`
  );
  
  const data = await res.json();

  const userTweets: Tweet[] = data.userTweets;
  
  return userTweets;
};
