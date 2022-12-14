// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query;
  await dbConnect();

  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    try {
      const tweets = await Tweet.find({
        $or: [
          { retweets: { $in: data.following } },
          { author: { $in: [...data.following, data.userID] } },
        ],
      })
        .populate({ path: "author", model: User })
        .skip(typeof page === "string" ? parseInt(page as string) : 0)
        .limit(10)
        .sort("-createdAt");

      res.status(200).send(tweets);
    } catch (err) {
      res.status(500).end(err);
    }
  }
}
