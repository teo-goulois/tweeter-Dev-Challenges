// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Tweet as TweetType,
  TweetBody,
  User as UserType,
} from "../../types/typing";
import dbConnect from "../../libs/dbConnect";
import User from "../../models/User";
import { ResUser } from "../../libs/users/users";

type Data = {
  followSugestions: UserType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userID } = req.query;
  //console.log("API FOLLOW SUGESTION");

  await dbConnect();
  const followSugestions = await User.find({
    follower: { $nin: userID },
    _id: { $ne: userID },
  }).limit(3);
  //console.log("API follow sugestions", followSugestions);

  res
    .status(200)
    .json({ followSugestions: followSugestions as unknown as UserType[] });
}
