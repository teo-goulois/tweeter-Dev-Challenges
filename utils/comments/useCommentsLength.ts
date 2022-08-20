import useSWR from "swr";
import { Comment } from "../../types/typing";

function useCommentsLength(tweetID: string | undefined) {
  const { data, error } = useSWR(key(tweetID));
  
  return {
    commentsLength: data?.length as Comment[],
    isLoading: !error && !data,
    isError: error,
  };
}

export default useCommentsLength;

export const key = (
  tweetID: string | undefined,
) => {
  return tweetID ? `/api/tweets/getCommentsLength?tweetID=${tweetID}` : null;
};
