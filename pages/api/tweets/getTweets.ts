// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody } from "../../../types/typing";
import Tweet from "../../../models/Tweet";
import dbConnect from "../../../libs/dbConnect";

type Data = {
  tweets: TweetType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  const tweets = await Tweet.find({})
    .populate({
      path: "author",
    })
    .populate("likes", "_id")
    .populate("retweets", "_id")
    .populate("bookmarks", "_id")
    .sort("-createdAt");

  res.status(200).json({ tweets: tweets as unknown as TweetType[] });
}
