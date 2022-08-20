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
  await dbConnect();
  try {
    const { query } = req.query;
    if (query) {
      
      const tweets = await Tweet.find({ text: {$regex: query} })
        .populate("author")
        .sort({ likes: -1 })
        .limit(10);
      
      return res.status(200).send(tweets);
    }
    const tweets = await Tweet.find({})
      .populate("author")
      .sort({ likes: -1 })
      .limit(10);
    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
