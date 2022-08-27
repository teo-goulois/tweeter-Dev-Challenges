// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
import Comment from "../../../models/Comment";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { userID, page } = req.query;

  try {
    const CommentedTweetID = await Comment.find({ author: userID }).select(
      "tweet"
    );
    const tweets = await Tweet.find({
      _id: { $in: CommentedTweetID.map((item) => item.tweet) },
    })
      .populate({ path: "author", model: User })
      .skip(typeof page === "string" ? parseInt(page as string) : 0)
      .limit(10)
      .sort("-createdAt");

    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
