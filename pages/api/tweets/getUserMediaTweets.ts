// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody } from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";

type Data = {
  userMediaTweets?: TweetType[];
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userID } = req.query;
  await dbConnect();
  try {
    const userMediaTweets = await Tweet.find({
      author: userID,
      "media.isMedia": true,
    })
      .populate("author")
      .populate("likes", "_id")
      .populate("retweets", "_id")
      .populate("bookmarks", "_id")
      .sort("-createdAt");

    res.status(200).json({
      message: "user tweets correctly fetched",
      userMediaTweets: userMediaTweets as unknown as TweetType[],
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured please try again later" });
  }
}
