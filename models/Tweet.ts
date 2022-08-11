import mongoose from "mongoose";
const { Schema } = mongoose;

const TweetSchema = new Schema(
  {
    text: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    blockTweet: Boolean,
    image: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    retweets: [{ type: Schema.Types.ObjectId, ref: "User" }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: {},
  }
);
// @ts-ignore
mongoose.models = {};
var Tweet = mongoose.model("Tweet", TweetSchema);

export default Tweet;
