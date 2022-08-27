// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  try {
    const { userID, page } = req.query;
    const tweets = await Tweet.find({bookmarks: userID, likes: userID})
      .populate({ path: 'author', model: User })
      .skip(typeof page === "string" ? parseInt(page as string) : 0)
      .limit(10)
      .sort({ likes: -1 })
    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
