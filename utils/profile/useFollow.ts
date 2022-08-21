import useSWR from "swr";
import { User } from "../../types/typing";

function useFollow(userID: string | undefined, action: string | null) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key(userID, action));

  return {
    followings: data as User[],
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFollow;

export const key = (userID: string | undefined, action: string | null) => {
  return userID && action ? `/api/users/${action}?userID=${userID}` : null;
};
