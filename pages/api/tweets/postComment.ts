// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Comment as CommentType,
  CommentBody,
  Tweet as TweetType,
  TweetBody,
} from "../../../types/typing";
import Tweet from "../../../models/Tweet";
import dbConnect from "../../../libs/dbConnect";
import Comment from "../../../models/Comment";

type Data = {
  message: string;
  comment?: CommentType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const data: CommentBody = JSON.parse(req.body);

  try {
    var newComment = new Comment({
      tweet: data.tweet._id,
      text: data.text,
      isDeleted: false,
      image: data.image,
      author: data.author,
      parent: data?.parent,
    });
    // Create new user
    var commentCreated = await newComment.save();
    console.log(commentCreated, "Comment create");

    res
      .status(200)
      .json({
        message: "comment added",
        comment: commentCreated as CommentType,
      });
  } catch (err) {
    res.status(500).json({ message: "an error occured please try later" });
  }
}
