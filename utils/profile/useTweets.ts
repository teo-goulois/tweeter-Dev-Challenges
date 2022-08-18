import useSWR from "swr";

function useTweet(_id: string | undefined) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(
    _id ? `/api/profile/getTweets?userID=${_id}` : null
  );
  return {
    tweets: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTweet;
