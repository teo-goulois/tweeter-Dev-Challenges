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

  await dbConnect();
  try {
    await Tweet.findOneAndUpdate(
      { _id: tweetID },
      { $pull: { bookmarks: userID } }
    );
    res.status(200).json({ message: "remove from bookmarks" });
  } catch (err) {
    res.status(500).json({ message: "an error occured please try later" });
  }
}
