import { ObjectId } from "mongodb";
import React from "react";

const useCheckIfChecked = (
  array: { type?: ObjectId | undefined; ref?: unknown; _id?: string }[],
  userID: string
) => {
  console.log(array, userID);

  const res = array?.filter((like) => like._id === userID)[0];
  if (res === undefined) return false;
  return true;
};

export default useCheckIfChecked;
