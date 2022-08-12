// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetID, userID } = req.query;

  await dbConnect()
  const response = await Tweet.findOneAndUpdate({'_id': tweetID}, {$push: {likes: userID}})
  console.log(response);
  
  res.status(200).json({ message: "added" });
}
