import useSWR from "swr";
import { Chat } from "../../types/typing";

function useChats(conversationID: string | undefined) {
  // get all user following tweet and his tweet
  const { data, error } = useSWR(key(conversationID));

  return {
    chats: data as Chat[],
    chatsIsLoading: !error && !data,
    chatsIsError: error,
  };
}

export default useChats;

export const key = (conversationID: string | undefined) => {
  return conversationID
    ? `/api/chat/getChats?conversationID=${conversationID}`
    : null;
};
