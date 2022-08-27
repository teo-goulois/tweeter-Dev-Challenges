// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../libs/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, page } = req.query;

  await dbConnect();
  try {
    if (q) {
      const tweets = await Tweet.find({ text: { $regex: q } })
        .populate({ path: "author", model: User })
        .skip(typeof page === "string" ? parseInt(page as string) : 0)
        .limit(10)
        .sort("-createdAt");

      return res.status(200).json(tweets);
    }
    const tweets = await Tweet.find({})
      .populate({ path: "author", model: User })
      .skip(typeof page === "string" ? parseInt(page as string) : 0)
      .limit(10)
      .sort("-createdAt");

    res.status(200).json(tweets);
  } catch (err) {
    res.status(500).end(err);
  }
}
