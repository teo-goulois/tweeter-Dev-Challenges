import moment from "moment";
import React from "react";
import { OutlineHeartIcon } from "../../icons/Icons";
import { Comment } from "../../types/typing";

type Props = {
  comment: Comment;
};

const Comment = ({ comment }: Props) => {
  return (
    <div className="flex items-start ">
      <div className="w-10 h-10 bg-gray rounded-lg mr-2"></div>
      <div className="w-full">
        {/* text, from and date */}
        <div className="bg-gray2 rounded-lg p-2">
          <div className="flex items-center">
            <h2 className="font-[Poppins] font-medium text-black text-sm ">
              {comment.username}
            </h2>
            <p className="ml-2 text-gray4 font-medium text-xs">
              {moment(comment._createdAt).format("DD MMMM [at] h:mm")}
            </p>
          </div>
          <p className="text-gray mt-1">
            {comment.comment}
          </p>
        </div>
        {/* comment infos */}
        <div className="text-xs text-gray4 font-semibold flex items-center">
          <button type="button" className="flex items-center">
            <div className="h-4">
              <OutlineHeartIcon />
            </div>
            <p>Like(d)</p>
          </button>

          <p className="ml-2">12k Likes</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
