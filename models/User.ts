import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    id: String,
    email: String,
    name: String,
    image: {
      type: String,
      default: "https://vectorified.com/images/default-user-icon-33.jpg",
    },
    provider: String,
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    follower: [{ type: Schema.Types.ObjectId, ref: "User" }],
    bio: String,
    banner: {
      type: String,
      default:
        "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wtcw?ver=11e6",
    },
  },
  {
    timestamps: {},
  }
);
// @ts-ignore
mongoose.models = {};
var User = mongoose.model("User", UserSchema);

export default User;
