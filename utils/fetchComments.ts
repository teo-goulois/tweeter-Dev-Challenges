import { Comment } from "../types/typing";

export const fetchComments = async (tweetID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getComments?tweetID=${tweetID}`
  );
  const data = await res.json();
  const comments: Comment[] = data.comments;

  return comments;
};
