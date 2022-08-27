// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import Chat from "../../../models/Chat";
import User from "../../../models/User";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { conversationID } = req.query;
  try {
    const conversations = await Chat.find({
      conversationID: conversationID,
    })
      .populate({ path: "author", select: "name image", model: User })
      .sort("createdAt")
      .limit(10);

    return res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
}
