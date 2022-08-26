import React, { useState } from "react";
import moment from "moment";
import { mutate } from "swr";
import toast from "react-hot-toast";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";
import { key } from "../../utils/comments/useComments";
// Icons
import { OutlineHeartIcon } from "../../icons/Icons";
// Types
import { Comment } from "../../types/typing";
import ImagesViewer from "../tweet/ImagesViewer";
import FsLightbox from "fslightbox-react";

type handleLikeProps = {
  commentID: string;
  userID: string;
  isAdding: boolean;
};

type Props = {
  comment: Comment;
  handleLike: ({
    commentID,
    userID,
    isAdding,
  }: handleLikeProps) => Promise<string | any[] | undefined>;
};

const Comment = ({ comment, handleLike }: Props) => {
  const { user } = useConnectedUser();
  const [toggler, setToggler] = useState(false);

  const handleCommentLike = async () => {
    if (!user)
      return toast.error(`you should be connected to like this comment`);
    if (comment.likes.includes(user._id)) {
      handleLike({
        commentID: comment._id,
        isAdding: false,
        userID: user._id,
      });
    } else {
      handleLike({
        commentID: comment._id,
        isAdding: true,
        userID: user._id,
      });
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-start my-2 "
    >
      {/* manage images preview */}
      {comment.images.length > 0 && (
        <FsLightbox toggler={toggler} sources={comment.images} />
      )}
      <div className="w-10 h-10 bg-[#C4C4C4] rounded-lg overflow-hidden mt-2">
        <img
          className="h-full w-full  object-center "
          src={comment.author?.image ?? ""}
          alt=""
        />
      </div>
      <div className="w-full">
        {/* text, from and date */}
        <div className="bg-gray2 rounded-lg p-2">
          <div className="flex items-center">
            <h2 className="font-[Poppins] font-medium text-black text-sm ">
              {comment.author?.name}
            </h2>
            <p className="ml-2 text-gray4 font-medium text-xs">
              {moment(comment.createdAt).format("DD MMMM [at] h:mm")}
            </p>
          </div>
          <p className="text-gray mt-1 mb-2">{comment.text}</p>
          {comment.images.length > 0 && (
            <ImagesViewer images={comment.images} setToggler={setToggler} />
          )}
        </div>
        {/* comment infos */}
        <div className="text-xs text-gray4 font-semibold flex items-center">
          <button
            onClick={handleCommentLike}
            type="button"
            className={`flex items-center ${
              user && comment.likes.includes(user._id) && "text-red"
            }`}
          >
            <div className="h-4">
              <OutlineHeartIcon />
            </div>
            <p>
              {user && comment.likes.includes(user._id) ? "Like(d)" : "like"}
            </p>
          </button>

          <p className={` ml-2`}>{comment.likes.length} Likes</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
