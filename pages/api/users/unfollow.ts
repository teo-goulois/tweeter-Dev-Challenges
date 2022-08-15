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
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userID, myID } = req.query;
  await dbConnect();

  try {
    // add to my following
    await User.findOneAndUpdate(
      { _id: myID },
      { $pull: { following: userID } }
    );
    await User.findOneAndUpdate({ _id: userID }, { $pull: { follower: myID } });

    // add to his follower
    res.status(200).json({ message: "person unfollowed" });
  } catch (err) {
    res.status(500).json({ message: "an error occured please try later" });
  }
}
