import mongoose from "mongoose";
const { Schema } = mongoose;

const TweetSchema = new Schema(
  {
    text: String,
    author: { type: Schema.Types.ObjectId, ref: "user" },
    blockTweet: { type: Boolean, default: false },
    image: String,
    media: {
      isMedia: Boolean,
      images: [String],
    },
    tags: [String],
    everyoneCanReply: { type: Boolean, default: true },
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
