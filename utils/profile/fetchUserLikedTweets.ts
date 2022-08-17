import { Tweet } from "../../types/typing";

export const fetchUserLikedTweets = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getUserLikedTweets?userID=${userID}`
  );
  const data = await res.json();

  const userLikedTweets: Tweet[] = data.userLikedTweets;
  
  return userLikedTweets;
};
