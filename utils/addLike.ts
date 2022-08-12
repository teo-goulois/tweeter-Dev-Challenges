import { Tweet } from "../types/typing";

export const addLike = async (
  tweetID: string,
  userID: string,
  tweets: Tweet[]
) => {
  //
  const response = await fetch(
    `/api/tweets/addLike?tweetID=${tweetID}&userID=${userID}`
  );
  const data = await response.json();
  console.log(data, "DATA LIKE");

  const newArray = tweets.map((item) => {
    console.log(item, "ITEM");

    if (item._id === tweetID) {
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
  return { tweets: newArray };
};
