// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody } from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";

type Data = {
  userTweets?: TweetType[];
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userID } = req.query;
  await dbConnect();
  try {
    const userTweets = await Tweet.find({ author: userID })
      .populate("author")
      .populate("likes", "_id")
      .populate("retweets", "_id")
      .populate("bookmarks", "_id")
      .sort("-createdAt");

    res.status(200).json({
      message: "user Tweets correctly fetched",
      userTweets: userTweets as unknown as TweetType[],
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured please try again later" });
  }
}
