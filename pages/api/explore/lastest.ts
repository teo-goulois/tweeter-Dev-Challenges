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
  const { q, page } = req.query;

  await dbConnect();
  try {
    console.log("api q page", q, page);

    if (q) {
      const tweets = await Tweet.find({ text: { $regex: q } })
        .skip(typeof page === "string" ? parseInt(page as string) : 0)
        .limit(10)
        .sort("-createdAt");

      return res.status(200).json(tweets);
    }
    const tweets = await Tweet.find({})
      .populate("author")
      .skip(typeof page === "string" ? parseInt(page as string) : 0)
      .limit(10)
      .sort("-createdAt");
    console.log("api tweets", tweets);

    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
