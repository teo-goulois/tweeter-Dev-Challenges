import useSWR from "swr";

function useTweet(
  title: "tweets" | "replies" | "media" | "likes",
  userID: string | undefined
) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key(title, userID));
  return {
    tweets: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTweet;

export const key = (
  title: "tweets" | "replies" | "media" | "likes",
  userID: string | undefined
) => {
  return userID ? `/api/bookmarks/${title}?userID=${userID}` : null;
};
