import useSWR from "swr";
import { Comment } from "../../types/typing";

function useComments(tweetID: string | undefined) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key(tweetID));
  console.log(data, 'data comments');
  
  return {
    comments: data as Comment[],
    isLoading: !error && !data,
    isError: error,
  };
}

export default useComments;

export const key = (
  tweetID: string | undefined,
) => {
  return tweetID ? `/api/tweets/getComments?tweetID=${tweetID}` : null;
};
