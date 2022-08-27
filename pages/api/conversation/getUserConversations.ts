// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import Conversation from "../../../models/Conversation";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { userID } = req.query;
  try {
    const conversations = await Conversation.find({
      members: { $in: userID },
    })
      .populate({ path: "author", model: User, select: "name" })
      .populate({ path: "members", model: User, select: "name image" });

    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
}
