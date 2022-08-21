import mongoose from "mongoose";
const { Schema } = mongoose;

const TagSchema = new Schema({
  tag: String,
  tag_count: Number,
  tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
});
// @ts-ignore
mongoose.models = {};
var Tag = mongoose.model("Tag", TagSchema);

export default Tag;
