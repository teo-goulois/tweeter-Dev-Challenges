import mongoose from "mongoose";
import Comment from "./Comment";
const { Schema } = mongoose;

const TweetSchema = new Schema(
  {
    text: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    blockTweet: Boolean,
    image: String,
    media: {
      isMedia: Boolean,
      images: [String],
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    retweets: [{ type: Schema.Types.ObjectId, ref: "User" }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: {},
  }
);

TweetSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "tweet",
});

// @ts-ignore
mongoose.models = {};
const Tweet = mongoose.model("Tweet", TweetSchema);

export default Tweet;
