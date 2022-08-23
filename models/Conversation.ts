import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    name: { type: String },
    desc: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
// @ts-ignore
mongoose.models = {};
var Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;
