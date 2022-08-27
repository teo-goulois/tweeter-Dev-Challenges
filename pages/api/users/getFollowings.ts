// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userID } = req.query;

  await dbConnect();
  // do aggreate
  try {
    const peoples = await User.find({ _id: userID })
      .populate({ path: "following", model: User })
      .select("following");

    res.status(200).send(peoples[0].following);
  } catch (err) {
    res.status(500).end(err);
  }
}
