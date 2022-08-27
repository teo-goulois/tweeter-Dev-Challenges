// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType } from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";

type Data = {
  message: string;
  tweet?: TweetType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const { id } = req.query;
  try {
    const tweet = await Tweet.findOne({ _id: id }).populate({
      path: "author",
      model: User,
    });

    res
      .status(200)
      .json({ message: "success", tweet: tweet as unknown as TweetType[] });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured please try again later" });
  }
}
