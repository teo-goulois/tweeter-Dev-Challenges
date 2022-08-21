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
  const { q } = req.query;
  console.log(req.query, 'req');
  
  console.log(q, 'queyr');

  await dbConnect();
  try {
    if (q) {
      const tweets = await Tweet.find({ text: { $regex: q } })
        .sort("-createdAt")
        .limit(10);
      console.log("query");

      return res.status(200).json(tweets);
    }
    const tweets = await Tweet.find({})
      .populate("author")
      .sort("-createdAt")
      .limit(10);

    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
