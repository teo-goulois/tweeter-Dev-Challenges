// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody } from "../../../types/typing";
import Tweet from "../../../models/Tweet";
import dbConnect from "../../../libs/dbConnect";

type Data = {
  topTweets: TweetType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  const topTweets = await Tweet.find({})
    .populate({
      path: "author",
    })
    .populate("likes", "_id")
    .populate("retweets", "_id")
    .populate("bookmarks", "_id")
    .sort({ likes: -1});

  res.status(200).json({ topTweets: topTweets as unknown as TweetType[] });
}
