import { useEffect, useState } from "react";
import { User } from "../types/typing";

const useFollow = (currentUser: User, tweetAuthor: User) => {

  const isCurrentUserFollowingTweetAuthor = currentUser.following.filter(
    (user) => user === tweetAuthor._id
  )[0];
  const isTweetAuthorFollowingCurrentUser = tweetAuthor.following.filter(
    (user) => user === currentUser._id
  )[0];
  /* console.log(
    isCurrentUserFollowingTweetAuthor,
    "isCurrentUserFollowingTweetAuthor",
    isTweetAuthorFollowingCurrentUser
  ); */
  if (isCurrentUserFollowingTweetAuthor && isTweetAuthorFollowingCurrentUser)
    return true;

  return false;
};

export default useFollow;
