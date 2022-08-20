import useSWR from "swr";

function useTweet(
  title: "lastest" | "top" | "people" | "media",
  query: string
) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key(title, query));
  return {
    tweets: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTweet;

export const key = (
  title: "lastest" | "top" | "people" | "media",
  query: string
) => {
  if (query.length > 0) {    
    return `/api/explore/${title}?query=${query}`;
  }
  return `/api/explore/${title}`;
};
