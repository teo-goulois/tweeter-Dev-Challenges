// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../libs/dbConnect";
import Tag from "../../models/Tag";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  // get 6 best tags
  try {
    const tags = await Tag.find({}).sort("-tag_count").limit(6);
    res.status(200).send(tags);
  } catch (err) {
    res.status(500).end(err);
  }
}
