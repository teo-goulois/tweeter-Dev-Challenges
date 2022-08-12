import { Tweet } from "../types/typing";

export const removeRetweet = async (
  tweetID: string,
  userID: string,
  tweets: Tweet[]
) => {
  const response = await fetch(
    `/api/tweets/removeRetweet?tweetID=${tweetID}&userID=${userID}`
  );
  const data = await response.json();
  if (response.status === 200) {
    const newArray = tweets.map((item) => {
      if (item._id === tweetID) {
        return {
          ...item,
          retweets: [
            ...item.retweets.filter((retweet) => retweet._id !== userID),
          ],
        };
      }
      return item;
    });

    return { tweets: newArray };
  }
  return alert(data.message);
};
