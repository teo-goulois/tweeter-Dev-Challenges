// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../libs/dbConnect";
import Comment from "../../../../models/Comment";
import Tweet from "../../../../models/Tweet";
import { Tweet as TweetType } from "../../../../types/typing";

type Data = {
  message: string;
  tweet?: TweetType | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { commentID, userID } = req.query;
  await dbConnect();
  if (req.method === "PUT") {
    try {
      await Comment.findOneAndUpdate(
        { _id: commentID },
        { $push: { likes: userID } }
      );
      res.status(200).json({ message: "comment liked" });
    } catch (err) {
      res.status(500).json({ message: "an error occured please try later" });
    }
  }
  if (req.method === "PATCH") {
    try {
      await Comment.findOneAndUpdate(
        { _id: commentID },
        { $pull: { likes: userID } }
      );
      res.status(200).json({ message: "comment unliked" });
    } catch (err) {
      res.status(500).json({ message: "an error occured please try later" });
    }
  }
}
