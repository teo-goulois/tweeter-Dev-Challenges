// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User as UserType } from "../../types/typing";
import dbConnect from "../../libs/dbConnect";
import User from "../../models/User";

type Data = {
  followSugestions: UserType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userID } = req.query;

  await dbConnect();
  const followSugestions = await User.find({
    follower: { $nin: userID },
    _id: { $ne: userID },
  }).limit(3);

  res
    .status(200)
    .json({ followSugestions: followSugestions as unknown as UserType[] });
}
