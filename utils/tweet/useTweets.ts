import useSWR from "swr";

function useTweet(tweetID: string | undefined) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key(tweetID));

  return {
    tweet: data?.tweet,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTweet;

export const key = (tweetID: string | undefined) => {
  return tweetID ? `/api/tweet/${tweetID}` : null;
};
