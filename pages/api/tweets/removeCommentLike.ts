import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import Comment from "../../../models/Comment";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { commentID, userID } = req.query;

  await dbConnect();
  try {
    await Comment.findOneAndUpdate(
      { _id: commentID },
      { $pull: { likes: userID } }
    );
    res.status(200).json({ message: "comment unliked" });
  } catch (err) {
    res.status(500).json({ message: "an error occured please try later" });
  }
}