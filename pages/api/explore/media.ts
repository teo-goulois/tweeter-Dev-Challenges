// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody, User } from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";

type Data = {
  tweets: TweetType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  await dbConnect();
  try {
    if (query) {
      const tweets = await Tweet.find({ text: { $regex: query } })
        .sort('-createdAt')
        .limit(10);

      return res.status(200).json(tweets);
    }
    const tweets = await Tweet.find({ "media.isMedia": true })
      .populate("author")
      .sort("-createdAt")
      .limit(10);

    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
