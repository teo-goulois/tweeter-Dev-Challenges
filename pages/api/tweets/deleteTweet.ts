// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody } from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetID } = req.query;
  await dbConnect();

  try {
    // Create new user
    await Tweet.findByIdAndRemove(tweetID);
    res.status(200).json({
      message: "tweet successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ message: "an error occured please try later" });
  }
}
