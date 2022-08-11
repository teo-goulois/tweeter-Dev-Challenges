import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    id: String,
    email: String,
    name: String,
    image: String,
    provider: String,
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    follower: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: {},
  }
);
// @ts-ignore
mongoose.models = {};
var User = mongoose.model("User", UserSchema);

export default User;
