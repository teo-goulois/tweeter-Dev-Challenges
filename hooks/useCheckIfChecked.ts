import { ObjectId } from "mongodb";
import React from "react";

const useCheckIfChecked = (array: { type?: ObjectId | undefined; ref?: unknown }[], userID: string) => {
  const res = array?.filter((like) => like === userID)[0];
  if (res === undefined) return false;
  return true;
};

export default useCheckIfChecked;
