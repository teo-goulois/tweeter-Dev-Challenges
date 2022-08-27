// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Comment as CommentType } from "../../../../types/typing";
import dbConnect from "../../../../libs/dbConnect";
import Comment from "../../../../models/Comment";
import User from "../../../../models/User";

type Data = {
  comments: CommentType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tweetID, page } = req.query;
  await dbConnect();
  if (req.method === "GET") {
    try {
      const comments = await Comment.find({ tweet: tweetID })
        .populate({ path: "author", model: User })
        .skip(typeof page === "string" ? parseInt(page as string) : 0)
        .limit(6)
        .sort("-createdAt");

      res.status(200).json(comments);
    } catch (err) {
      res.status(500).end(err);
    }
  }
}
