import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    text: String,
    images: [String],
    conversationID: { type: Schema.Types.ObjectId, ref: "Conversation" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
// @ts-ignore
mongoose.models = {};
var Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
