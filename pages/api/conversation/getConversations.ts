// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody } from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
import Conversation from "../../../models/Conversation";

type Data = {
  message: string;
  tweet?: TweetType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { userID, q } = req.query;
  try {
    if (q) {
      const conversations = await Conversation.find(
        q.length > 1
          ? {
              name: { $regex: q },
            }
          : {}
      )
        .populate("author", "name")
        .populate("members", "image name");

      return res.status(200).json(conversations);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
