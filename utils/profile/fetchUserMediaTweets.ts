import { Tweet } from "../../types/typing";

export const fetchUserMediaTweets = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getUserMediaTweets?userID=${userID}`
  );
  const data = await res.json();

  const userMediaTweets: Tweet[] = data.userMediaTweets;
  
  return userMediaTweets;
};
