import { Comment } from "../types/typing";

export const removeCommentLike = async (
  commentID: string,
  userID: string,
  comments: Comment[]
) => {
  const response = await fetch(
    `/api/tweets/removeCommentLike?commentID=${commentID}&userID=${userID}`
  );
  const data = await response.json();
  if (response.status === 200) {
    const newArray = comments.map((item) => {
      if (item._id === commentID) {
        return {
          ...item,
          likes: [...item.likes.filter((like) => like._id !== userID)],
        };
      }
      return item;
    });

    return { comments: newArray };
  }
  return alert(data.message);
};
