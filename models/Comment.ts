import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    tweet: { type: Schema.Types.ObjectId, ref: "Tweet" },
    isDeleted: Boolean,
    text: String,
    images: [String],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  {
    timestamps: {},
  }
);
// @ts-ignore
mongoose.models = {};
var Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
