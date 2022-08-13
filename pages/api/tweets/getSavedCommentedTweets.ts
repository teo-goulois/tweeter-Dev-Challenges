// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody } from "../../../types/typing";
import Tweet from "../../../models/Tweet";
import dbConnect from "../../../libs/dbConnect";
import Comment from "../../../models/Comment";
import mongoose from "mongoose";

type Data = {
  savedCommentedTweets: TweetType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const { userID } = req.query;
  const savedCommentedTweetID = await Comment.find({ author: userID }).select(
    "tweet"
  );
  const savedCommentedTweets = await Tweet.find({
    _id: { $in: savedCommentedTweetID.map((item) => item.tweet) },
  })
    .populate("author")
    .populate("likes", "_id")
    .populate("retweets", "_id")
    .populate("bookmarks", "_id")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json({ savedCommentedTweets: savedCommentedTweets as TweetType[] });
}
