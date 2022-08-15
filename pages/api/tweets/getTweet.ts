// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Tweet as TweetType, TweetBody } from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Tweet from "../../../models/Tweet";
import Comment from "../../../models/Comment";
import mongoose from "mongoose";
import User from "../../../models/User";

type Data = {
  tweet: TweetType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetID } = req.query;
  console.log(tweetID);

  await dbConnect();
  const tweet = await Tweet.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(tweetID as string),
      },
    },
    {
      $lookup: {
        from: Comment.collection.name,
        let: { commentID: "$_id" },
        pipeline: [
          {
            $lookup: {
              from: User.collection.name,
              localField: "author",
              foreignField: "_id",
              as: "author",
            },
          },
          {
            $unwind: {
              path: "$author",
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $project: {
              "author.email": 0,
              "author.follower": 0,
              "author.following": 0,
              "author.id": 0,
              "author.provider": 0,
              "author.updatedAt": 0,
              "author.__v": 0,
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $lookup: {
        from: User.collection.name,
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
      },
    },
    {
      $project: {
        "author.email": 0,
        "author.follower": 0,
        "author.following": 0,
        "author.id": 0,
        "author.provider": 0,
        "author.updatedAt": 0,
        "author.__v": 0,
      },
    },
    {
      $project: {
        author: 1,
        blockTweet: 1,
        comments: 1,
        createdAt: 1,
        media: 1,
        text: 1,
        likes: {
          $map: {
            input: "$likes",
            as: "like",
            in: {
              _id: "$$like",
            },
          },
        },
        retweets: {
          $map: {
            input: "$retweets",
            as: "retweet",
            in: {
              _id: "$$retweet",
            },
          },
        },
        bookmarks: {
          $map: {
            input: "$bookmarks",
            as: "bookmark",
            in: {
              _id: "$$bookmark",
            },
          },
        },
      },
    },
  ]);

  /*   find({ _id: tweetID })
    .populate("author")
    .populate("likes", "_id")
    .populate("retweets", "_id")
    .populate("bookmarks", "_id")
    .sort("-createdAt"); */

  res.status(200).json({ tweet: tweet as TweetType[] });
}

/* 
[
    {
      $match: {
        _id: new mongoose.Types.ObjectId(tweetID as string),
      },
    },
    {
      $lookup: {
        from: Comment.collection.name,
        let: { commentID: "$_id" },
        pipeline: [
          {
            $lookup: {
              from: User.collection.name,
              localField: "_id",
              foreignField: "author",
              as: "author",
            },
          },
          {
            $addFields: {
              useqsdqsr: { $arrayElemAt: ["$comments.author", 0] },
            },
          },
        ],
        as: "comments",
      },
    },
   
]
*/

// ------------------------------
/* 

[
    {
      $match: {
        _id: new mongoose.Types.ObjectId(tweetID as string),
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "tweet",
        as: "comments",
        pipeline: [

        ]
      },
    },
    {
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "comments.author",
        foreignField: "_id",
        as: "comments.author",
      },
    },
    {
      $unwind: {
        path: "$comments.author",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]
*/
