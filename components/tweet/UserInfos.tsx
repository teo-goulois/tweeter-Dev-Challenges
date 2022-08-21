import React from "react";
import Link from "next/link";
import moment from "moment";
// Components
import ProfileImage from "../global/ProfileImage";
// Types
import { Tweet } from "../../types/typing";

type Props = {
  tweet: Tweet;
};

const UserInfos = ({ tweet }: Props) => {
  return (
    <div className="flex items-center">
      <ProfileImage url={tweet.author?.image} />
      {/* username and date */}
      <div onClick={(e) => e.stopPropagation()} className="pl-2">
        <Link href={`/profile/${tweet.author._id}`}>
          <a className="font-[Poppins] text-black font-medium ">
            {tweet.author?.name}
          </a>
        </Link>
        <p className="font-medium text-xs text-gray4">
          {moment(tweet.createdAt).format("DD MMMM [at] h:mm")}
        </p>
      </div>
    </div>
  );
};

export default UserInfos;
