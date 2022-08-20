// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody, User } from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
import Comment from "../../../models/Comment";

type Data = {
  tweets: TweetType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { userID } = req.query;

  try {
    const CommentedTweetID = await Comment.find({ author: userID }).select(
      "tweet"
    );
    const tweets = await Tweet.find({
      _id: { $in: CommentedTweetID.map((item) => item.tweet) },
      bookmarks: { $in: userID },
    })
      .populate("author")
      .sort("-createdAt")
      .limit(10);

    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
