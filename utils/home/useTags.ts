import useSWR from "swr";
import { Tag } from "../../types/typing";

function useTags() {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key());
  return {
    tags: data as Tag[],
    tagsIsLoading: !error && !data,
    tagsIsError: error,
  };
}

export default useTags;

export const key = () => {
  return `/api/getTags`;
};
