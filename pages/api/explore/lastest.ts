// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../libs/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType } from "../../../types/typing";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";

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
    console.log(`api/exlpore/top?q=${q}&page=${page}`);

    if (q) {
      const tweets = await Tweet.find({ text: { $regex: q } })
        .skip(typeof page === "string" ? parseInt(page as string) : 0)
        .limit(10)
        .sort("-createdAt");

      return res.status(200).json(tweets);
    }
    const tweets = await Tweet.find({})
      .populate({ path: 'author', model: User })
      .skip(typeof page === "string" ? parseInt(page as string) : 0)
      .limit(10)
      .sort("-createdAt");
    console.log("lastest", tweets[0]);

    res.status(200).json(tweets);
  } catch (err) {
    console.log("error", err);
    res.status(500).end(err);
  }
}
