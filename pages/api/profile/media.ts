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
  const { userID, page } = req.query;

  try {
    const tweets = await Tweet.find({
      author: userID,
      "media.isMedia": true,
    })
      .populate("author")
      .skip(typeof page === "string" ? parseInt(page as string) : 0)
      .limit(10)
      .sort("-createdAt");

    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
