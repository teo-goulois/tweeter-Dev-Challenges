import React from "react";
import moment from "moment";
// Components
import ProfileImage from "../global/ProfileImage";
import { Tweet } from "../../types/typing";

type Props = {
  tweet: Tweet;
};

const UserInfos = ({ tweet }: Props) => {
  return (
    <div className="flex items-center">
      <ProfileImage url={tweet.author?.image} />
      {/* username and date */}
      <div className="pl-2">
        <h3 className="font-[Poppins] text-black font-medium ">
          {tweet.author?.name}
        </h3>
        <p className="font-medium text-xs text-gray4">
          {moment(tweet.createdAt).format("DD MMMM [at] h:mm")}
        </p>
      </div>
    </div>
  );
};

export default UserInfos;
