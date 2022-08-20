import useSWR from "swr";
import { User } from "../../types/typing";

function useFollowSugestions(_id: string | undefined) {
  
  const { data, error } = useSWR(
    _id ? `/api/getFollowSugestions?userID=${_id}` : null
  );

  return {
    followSugestions: data?.followSugestions as User[],
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFollowSugestions;
