// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody } from "../../../types/typing";
import Tweet from "../../../models/Tweet";
import dbConnect from "../../../libs/dbConnect";

type Data = {
  tweet: TweetType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const data: TweetBody = JSON.parse(req.body);
  var newTweet = new Tweet({
    text: data.text,
    image: data.image,
    media: {
      isMedia: data.media.images.length > 0 ? true : false,
      images: data.media.images,
    },
    everyoneCanReply: data.everyoneCanReply,
    author: data.author,
  });
  // Create new user
  var tweetCreated = await newTweet.save();

  res.status(200).json({ tweet: tweetCreated as unknown as TweetType });
}
