import useSWR from "swr";
import { Conversation } from "../../types/typing";

function useChannels(userID: string | undefined, query: string) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key(userID, query));

  return {
    channels: data as Conversation[],
    channelsIsLoading: !error && !data,
    channelsIsError: error,
  };
}

export default useChannels;

export const key = (userID: string | undefined, q: string) => {
  if (q.length > 0) {
    console.log("q");

    return userID
      ? `/api/conversation/getConversations?userID=${userID}&q=${encodeURIComponent(
          q
        )}`
      : null;
  }
  console.log("not q");

  return userID
    ? `/api/conversation/getUserConversations?userID=${userID}`
    : null;
};
