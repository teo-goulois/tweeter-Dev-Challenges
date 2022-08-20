// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Comment as CommentType,
  Tweet as TweetType,
  TweetBody,
} from "../../../types/typing";
import Tweet from "../../../models/Tweet";
import dbConnect from "../../../libs/dbConnect";
import Comment from "../../../models/Comment";

type Data = {
  comments: CommentType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tweetID } = req.query;
  await dbConnect();

  const comments = await Comment.find({ tweet: tweetID }).select("_id");

  res.status(200).json(comments);
}
