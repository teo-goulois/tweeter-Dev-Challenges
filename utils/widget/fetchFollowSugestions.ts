import { User } from "../../types/typing";

export const fetchFollowSugestions = async (userID: string | undefined) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getFollowSugestions?userID=${userID}`
  );
  const data = await res.json();
  const followSugestions: User[] = data.followSugestions;
  console.log(followSugestions, "followSugestions");

  return followSugestions;
};
