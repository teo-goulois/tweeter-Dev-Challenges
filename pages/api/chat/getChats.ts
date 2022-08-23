// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Chat as ChatType } from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
import Conversation from "../../../models/Conversation";
import Chat from "../../../models/Chat";

type Data = {
  message: string;
  chats?: ChatType[];
};

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
      .populate("author", "name image")
      .sort("createdAt")
      .limit(10);

    return res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
}
