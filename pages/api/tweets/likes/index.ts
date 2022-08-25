// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../libs/dbConnect";
import Tweet from "../../../../models/Tweet";
import { Tweet as TweetType } from "../../../../types/typing";

type Data = {
  message: string;
  tweet?: TweetType | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetID, userID } = req.query;
  await dbConnect();
  if (req.method === "PUT") {
    try {
      const tweet = await Tweet.findOneAndUpdate(
        { _id: tweetID },
        { $push: { likes: userID } }
      );

      res
        .status(200)
        .json({ message: "tweet liked", tweet: tweet as unknown as TweetType });
    } catch (err) {
      res.status(500).json({ message: "an error occured please try later" });
    }
  }
  if (req.method === "PATCH") {
    try {
      const tweet = await Tweet.findOneAndUpdate(
        { _id: tweetID },
        { $pull: { likes: userID } }
      );
      res.status(200).json({
        message: "tweet unliked",
        tweet: tweet as unknown as TweetType,
      });
    } catch (err) {
      res.status(500).json({ message: "an error occured please try later" });
    }
  }
}
