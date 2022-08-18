import useSWR from "swr";

function useTweet(_id: string | undefined, following: string[] | undefined) {
  // get all user following tweet and his tweet  
  const { data, error } = useSWR(
    _id
      ? [
          `/api/home/getTweets`,
          {
            method: "POST",
            body: JSON.stringify({
              _id,
              following,
            }),
          },
        ]
      : null
  );
  return {
    tweets: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTweet;
