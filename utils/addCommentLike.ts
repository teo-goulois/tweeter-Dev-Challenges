import { Comment } from "../types/typing";

export const addCommentLike = async (
  commentID: string,
  userID: string,
  comments: Comment[]
) => {
  //
  const response = await fetch(
    `/api/tweets/addCommentLike?commentID=${commentID}&userID=${userID}`
  );
  const data = await response.json();
  if (response.status === 200) {
    const newArray = comments.map((item) => {
      if (item._id === commentID) {
        return {
          ...item,
          likes: [
            ...item.likes,
            {
              _id: userID,
            },
          ],
        };
      }
      return item;
    });
    return { comments: newArray };
  }
  return alert(data.message);
};
