import { useSession } from "next-auth/react";
import useSWR from "swr";
// Types
import { User } from "../../types/typing";

function useUser() {
  const { data: session } = useSession();
  const { data, error } = useSWR(
    session?.user ? `/api/user/${session?.user._id}` : null
  );

  return {
    user: data as User | undefined,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUser;
