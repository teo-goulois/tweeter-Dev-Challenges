// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import User from "../../../models/User";
import { User as userType } from "../../../types/typing";

type Data = {
  user: userType | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id } = req.query;

  try {
    const user = await User.findOne({ _id: id });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}
