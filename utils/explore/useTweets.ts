import useSWR from "swr";

function useTweet(
  title: "lastest" | "top" | "people" | "media",
  query: string
) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key(title, query));
  console.log('azeaz', data, title, query);
  
  return {
    tweets: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTweet;

export const key = (
  title: "lastest" | "top" | "people" | "media",
  q: string
) => {

  if (q?.length > 0) {
    console.log("e");
    
    return `/api/explore/${title}?q=${encodeURIComponent(q)}`;
  }

  return `/api/explore/${title}`;
};
