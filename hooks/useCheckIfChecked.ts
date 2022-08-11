import React from "react";
import { Reference } from "../types/typing";

const useCheckIfChecked = (array: Reference[], userID: string) => {
  const res = array?.filter((like) => like.to._ref === userID)[0];
  if (res === undefined) return false;
  return true;
};

export default useCheckIfChecked;
