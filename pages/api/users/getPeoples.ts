// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Tweet as TweetType,
  TweetBody,
  User as UserType,
} from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import User from "../../../models/User";
import { ResUser } from "../../../libs/users/users";

type Data = {
  peoples: UserType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query;

  await dbConnect();
  // do aggreate 
  const peoples = await User.find({ name: 'teo goulois' ?? undefined })
    .populate("following", "_id")
    .populate("follower", "_id");

  res.status(200).json({ peoples: peoples as unknown as UserType[] });
}
