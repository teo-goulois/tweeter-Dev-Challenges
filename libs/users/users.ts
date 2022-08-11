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
  /* const { db } = await connectToDatabase();
  const user = db.collection("users").findOne({ id });
  */
  await dbConnect();
  const user = await User.findOne({ id }).exec();
  console.log(user, "USER");
  return user;
};

export const createUser = async (user: ReqUser) => {
  /*  const { db } = await connectToDatabase();
  const response = db.collection("users").insertOne({
    ...user,
    completed: false,
    createdAt: new Date(),
  }); */
  await dbConnect();
  console.log("CREATE USER");

  var newUser = new User({
    ...user,
    completed: false,
    createdAt: new Date(),
  });
  // Create new user
  var usercreated = await newUser.save();
  console.log(usercreated, "usercreated");

  return usercreated;
};
