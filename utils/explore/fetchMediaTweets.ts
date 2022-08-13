import { Tweet } from "../../types/typing";

export const fetchMediaTweets = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getMediaTweets`
  );
  const data = await res.json();
  const mediaTweets: Tweet[] = data.mediaTweets;
  return mediaTweets;
};
