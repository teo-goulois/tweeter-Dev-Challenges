import useSWR from "swr";
import { User } from "../../types/typing";

function useFollowSugestions(_id: string | undefined) {
  //console.log(_id, 'ID');
  
  const { data, error } = useSWR(
    _id ? `/api/getFollowSugestions?userID=${_id}` : null
  );

  //console.log(data, 'DATA FOLLOW SUGESTION');
  

  return {
    followSugestions: data?.followSugestions as User[],
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFollowSugestions;
