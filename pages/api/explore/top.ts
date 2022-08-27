import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody, User } from "../../../types/typing";

type Data = {
  tweets: TweetType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  try {
    const { q, page } = req.query;
    console.log(`api/exlpore/top?q=${q}&page=${page}`);

    if (q) {
      console.log("query", q);

      const tweets = await Tweet.find({ text: { $regex: q } })
        .populate("author")
        .skip(typeof page === "string" ? parseInt(page as string) : 0)
        .limit(10)
        .sort({ likes: -1 });

      return res.status(200).send(tweets);
    }
    const tweets = await Tweet.find({})
      .populate("author")
      .skip(typeof page === "string" ? parseInt(page as string) : 0)
      .limit(10)
      .sort({ likes: -1 });
    console.log(typeof tweets, "res tweets", tweets[0]);
    res.status(200).send(tweets);
  } catch (err) {
    console.log("error", err);

    res.status(500).send(err);
  }
}
