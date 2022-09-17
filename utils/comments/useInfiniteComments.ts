import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { User } from "../../types/typing";

function useInfiniteComment(tweetID: string | undefined, pageSize: number) {
  // get all user following tweet and his tweet
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => getKey(index, tweetID)
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
    commentID: string;
    userID: string;
    isAdding: boolean;
  };

  const addComment = async (body: any, user: User) => {
    const response = await fetch(`/api/tweets/postComment`, {
      body: JSON.stringify(body),
      method: "POST",
    });
    const data = await response.json();
    if (response.status === 200) {
      return mutate((t) => {
        const arr = [],
          size = pageSize;

        if (!t) return [{ ...data.comment, author: user }];
        t[0] = [{ ...data.comment, author: user }, ...t[0]];

        while (t.length > 0) arr.push(t.splice(0, size));

        return arr[0];
      }, false);
    } else {
      return toast.error("an error occured please try agin later");
    }
  };

  const handleLike = async ({ commentID, userID, isAdding }: Props) => {
    if (isAdding) {      
      const response = await fetch(
        `/api/tweets/comments/like?commentID=${commentID}&userID=${userID}`,
        { method: "PUT" }
      );
      const data = await response.json();
      if (response.status === 200) {
        return mutate((t) => {
          const arr = [],
            size = 10;
          let newIssue = issues.find((item) => item._id === commentID);
          if (!newIssue) return;
          newIssue.likes = [...newIssue.likes, userID];
          if (!t) return;
          while (t.length > 0) arr.push(t.splice(0, size));
          return arr[0];
        }, false);
      } else {
        return toast.error(data.message);
      }
    } else {
      const response = await fetch(
        `/api/tweets/comments/like?commentID=${commentID}&userID=${userID}`,
        { method: "PATCH" }
      );
      const data = await response.json();
      if (response.status === 200) {
        return mutate((t) => {
          const arr = [],
            size = 10;
          let newIssue = issues.find((item) => item._id === commentID);
          if (!newIssue) return;
          newIssue.likes = newIssue.likes.filter(
            (item: string) => item !== userID
          );
          if (!t) return;
          while (t.length > 0) arr.push(t.splice(0, size));
          return arr[0];
        }, false);
      } else {
        return toast.error(data.message);
      }
    }
  };

  return {
    size,
    mutate,
    setSize,
    comments: issues,
    commentsIsLoading: isLoadingInitialData,
    commentsIsLoadingMore: isLoadingMore,
    commentsIsError: error,
    commentsIsEmpty: isEmpty,
    commentsIsReachingEnd: isReachingEnd,
    commentsIsRefreshing: isRefreshing,
    handleLike,
    addComment,
  };
}

export default useInfiniteComment;

export const getKey = (pageIndex: number, tweetID: string | undefined) => {
  return tweetID
    ? `/api/tweets/comments?tweetID=${tweetID}&page=${pageIndex * 6}`
    : null;
};
