// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
import User from "../../../models/User";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, page } = req.query;

  await dbConnect();
  try {
    console.log(`api/exlpore/top?q=${q}&page=${page}`);

    if (q) {
      const tweets = await Tweet.find({ text: { $regex: q } })
        .populate({ path: "author", model: User })
        .skip(typeof page === "string" ? parseInt(page as string) : 0)
        .limit(10)
        .sort("-createdAt");

      return res.status(200).json(tweets);
    }
    const tweets = await Tweet.find({ "media.isMedia": true })
      .populate({ path: "author", model: User })
      .skip(typeof page === "string" ? parseInt(page as string) : 0)
      .limit(10)
      .sort("-createdAt");

    res.status(200).send(tweets);
  } catch (err) {
    res.status(500).send(err);
  }
}
