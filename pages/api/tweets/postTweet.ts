// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody } from "../../../types/typing";
import Tweet from "../../../models/Tweet";
import dbConnect from "../../../libs/dbConnect";
import Tag from "../../../models/Tag";

type Data = {
  tweet: TweetType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const data: TweetBody = JSON.parse(req.body);
  const tags = data.text?.match(/#[a-zA-Z0-9]+/g);

  var newTweet = new Tweet({
    text: data.text,
    image: data.image,
    media: {
      isMedia: data.media.images.length > 0 ? true : false,
      images: data.media.images,
    },
    everyoneCanReply: data.everyoneCanReply,
    author: data.author,
    tags: tags,
  });
  // Create new user
  var tweetCreated = await newTweet.save();

  tags &&
    (await Promise.all(
      tags.map(async (tag) => {
        // check if tag already exist
        const res = await Tag.count({ tag: tag });
        if (res > 0) {
          // update it
          const updatedTag = await Tag.findOneAndUpdate(
            { tag },
            { $push: { tweets: tweetCreated._id }, $inc: { tag_count: 1 } }
          );
        } else {
          // if not create it

          const newTag = new Tag({
            tag,
            tag_count: 1,
            tweets: [tweetCreated._id],
          });

          const t = await newTag.save();
        }
      })
    ));

  res.status(200).json({ tweet: tweetCreated as unknown as TweetType });
}
