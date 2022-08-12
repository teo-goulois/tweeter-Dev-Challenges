import { connectToDatabase } from "../mongodb";
import dbConnect from "../dbConnect";

import User from "../../models/User";

export type ReqUser = {
  id: string;
  email: string;
  name: string;
  image: string;
  provider: string;
};

export type userTokens = {
  id: string;
  firebaseUid: string;
};

export type ResUser = ReqUser & {
  isAdmin: boolean;
  _id: string;
  following: string[];
  follower: string[];
  __v: number;
};

export const getUser = async (id: string) => {
  await dbConnect();
  const user = await User.findOne({ id }).exec();
  return user;
};

export const createUser = async (user: ReqUser) => {
  await dbConnect();
  var newUser = new User({
    ...user,
    completed: false,
    createdAt: new Date(),
  });
  // Create new user
  var usercreated = await newUser.save();

  return usercreated;
};
