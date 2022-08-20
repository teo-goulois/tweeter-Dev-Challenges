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
  const { userID } = req.query;
  console.log(userID, 'API userid tweets bookmùarls');
  
  try {
    const tweets = await Tweet.find({ bookmarks: { $in: userID } })
      .populate("author")
      .sort("-createdAt")
      .limit(10);
    console.log(tweets);
    
    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
