import { Tweet, User } from "../../types/typing";

export const fetchPeoples = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getPeoples`
  );
  const data = await res.json();
  const peoples: User[] = data.peoples;
  return peoples;
};
