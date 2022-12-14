import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType } from "../../../types/typing";

type Data = {
  tweets: TweetType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  try {
    const { q, page } = req.query;
    if (q) {
      const tweets = await Tweet.find({ text: { $regex: q } })
        .populate({ path: "author", model: User })
        .skip(typeof page === "string" ? parseInt(page as string) : 0)
        .limit(10)
        .sort({ likes: -1 });

      return res.status(200).send(tweets);
    }
    const tweets = await Tweet.find({})
      .populate({ path: "author", model: User })
      .skip(typeof page === "string" ? parseInt(page as string) : 0)
      .limit(10)
      .sort({ likes: -1 });
    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
