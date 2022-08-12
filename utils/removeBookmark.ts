import { Tweet } from "../types/typing";

export const removeBookmark = async (
  tweetID: string,
  userID: string,
  tweets: Tweet[]
) => {
  const response = await fetch(
    `/api/tweets/removeBookmark?tweetID=${tweetID}&userID=${userID}`
  );
  const data = await response.json();
  if (response.status === 200) {
    const newArray = tweets.map((item) => {
      if (item._id === tweetID) {
        return {
          ...item,
          bookmarks: [
            ...item.bookmarks.filter((bookmark) => bookmark._id !== userID),
          ],
        };
      }
      return item;
    });

    return { tweets: newArray };
  }
  return alert(data.message);
};
