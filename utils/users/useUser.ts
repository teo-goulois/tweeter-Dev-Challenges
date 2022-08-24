import useSWR from "swr";
// Types
import { User } from "../../types/typing";

function useUser(_id: string | undefined) {
  const { data, error } = useSWR(_id ? `/api/user/${_id}` : null);

  return {
    user: data as User | undefined,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUser;
