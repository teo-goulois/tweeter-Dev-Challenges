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
  res: NextApiResponse<Data>
) {
  const data: User = JSON.parse(req.body);
  //console.log(data, 'DATA');
  
  await dbConnect();
  const tweets = await Tweet.find({/* author: {$in: [...data.following, data._id]} */})
    .populate("author")
    .populate("likes", "_id")
    .populate("retweets", "_id")
    .populate("bookmarks", "_id")
    .sort("-createdAt"); 
  
  res.status(200).json({ tweets: tweets as TweetType[] });
}
