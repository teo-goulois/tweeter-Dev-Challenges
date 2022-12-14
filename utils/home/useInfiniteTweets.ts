import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { User } from "../../types/typing";

function useInfiniteTweet(
  userID: string | undefined,
  following: string[] | undefined,
  pageSize: number
) {
  // get all user following tweet and his tweet
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => getKey(index, userID, following)
  );

  const issues: any[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  const isRefreshing = isValidating && data && data.length === size;

  type Props = {
    tweetID: string;
    userID: string;
    title: "bookmarks" | "likes" | "retweets";
    isAdding: boolean;
  };

  type UploadTweetProps = {
    fromProfile: boolean | undefined;
    filter: string | undefined;
    body: {
      text: string;
      author: string | undefined;
      media: {
        images: string[];
      };
      everyoneCanReply: boolean;
    };
    user: User;
  };

  const uploadTweet = async ({
    fromProfile,
    filter,
    body,
    user,
  }: UploadTweetProps) => {
    if (fromProfile && filter) {
      mutate(async (t) => {
        const response = await fetch(`/api/tweets/postTweet`, {
          body: JSON.stringify(body),
          method: "POST",
        });
        const data = await response.json();
        if (!t) return;
        return [{ ...data.tweet, author: user }, ...t];
      });
    } else {
      mutate(async (t) => {
        // await post reponse
        const response = await fetch(`/api/tweets/postTweet`, {
          body: JSON.stringify(body),
          method: "POST",
        });
        const data = await response.json();
        if (!t) return;
        return [{ ...data.tweet, author: user }, ...t];
      });
    }
  };

  const handleUpdateInfos = async ({
    tweetID,
    userID,
    title,
    isAdding,
  }: Props) => {
    if (isAdding) {
      const res = await fetch(
        `/api/tweets/${title}?tweetID=${tweetID}&userID=${userID}`,
        { method: "PUT" }
      );
      if (res.status === 200) {
        return mutate((t) => {
          const arr = [],
            size = 10;
          let newIssue = issues.find((item) => item._id === tweetID);
          if (!newIssue) return;
          newIssue[title] = [...newIssue[title], userID];
          if (!t) return;
          while (t.length > 0) arr.push(t.splice(0, size));
          return arr[0];
        }, false);
      }
      return toast.error("an error occured please try again later");
    } else {
      const res = await fetch(
        `/api/tweets/${title}?tweetID=${tweetID}&userID=${userID}`,
        { method: "PATCH" }
      );
      if (res.status === 200) {
        return mutate((t) => {
          const arr = [],
            size = 10;
          let newIssue = issues.find((item) => item._id === tweetID);
          if (!newIssue) return;
          newIssue[title] = newIssue[title].filter(
            (item: string) => item !== userID
          );
          if (!t) return;
          while (t.length > 0) arr.push(t.splice(0, size));
          return arr[0];
        }, false);
      }
      return toast.error("an error occured please try again later");
    }
  };

  return {
    size,
    mutate,
    setSize,
    tweets: issues,
    tweetsIsLoading: isLoadingInitialData,
    tweetsIsLoadingMore: isLoadingMore,
    tweetsIsError: error,
    tweetsIsEmpty: isEmpty,
    tweetsIsReachingEnd: isReachingEnd,
    tweetsIsRefreshing: isRefreshing,
    handleUpdateInfos,
    uploadTweet,
  };
}

export default useInfiniteTweet;

export const getKey = (
  pageIndex: number,
  userID: string | undefined,
  following: string[] | undefined
) => {
  return userID
    ? [
        `/api/home/getTweets?page=${pageIndex * 10}`,
        {
          method: "POST",
          body: JSON.stringify({
            userID,
            following,
          }),
        },
      ]
    : null;
};
