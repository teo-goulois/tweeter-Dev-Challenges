import useSWR from "swr";

function useFollower(userID: string | undefined) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key(userID));

  return {
    followers: data.follower,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFollower;

export const key = (userID: string | undefined) => {
  return userID ? `/api/users/getFollowers?userID=${userID}` : null;
};
