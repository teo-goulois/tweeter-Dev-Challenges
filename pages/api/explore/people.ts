// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Tweet as TweetType,
  TweetBody,
  User as UserType,
} from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import User from "../../../models/User";
import { ResUser } from "../../../libs/users/users";

type Data = {
  peoples: UserType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, page } = req.query;
  await dbConnect();

  try {
    console.log(`api/exlpore/top?q=${q}&page=${page}`);

    if (q) {
          console.log(`api/exlpore/top?q=${q}&page=${page}`);

      const peoples = await User.find({ name: { $regex: q } })
      .skip(typeof page === "string" ? parseInt(page as string) : 0)
      .limit(10)
      .sort({ follower: -1 })

      return res.status(200).json(peoples);
    }
    const peoples = await User.find({ })
      .sort({ follower: -1 })
      .limit(10);

      
    res.status(200).json(peoples);
  } catch (err) {
    res.status(500).send(err);
  }
}
