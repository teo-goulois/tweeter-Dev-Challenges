import useSWR from "swr";

function useTweet(
  userID: string | undefined,
  title: "tweets" | "replies" | "media" | "likes"
) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key(userID, title));
  return {
    tweets: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTweet;

export const key = (
  userID: string | undefined,
  title: "tweets" | "replies" | "media" | "likes"
) => {
  return userID ? `/api/profile/${title}?userID=${userID}` : null;
};
