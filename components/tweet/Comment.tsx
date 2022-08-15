import React from "react";
import { useSession } from "next-auth/react";
import moment from "moment";
// Hooks
import useCheckIfChecked from "../../hooks/useCheckIfChecked";
import { addCommentLike } from "../../utils/addCommentLike";
import { removeCommentLike } from "../../utils/removeCommentLike";
// Icons
import { OutlineHeartIcon } from "../../icons/Icons";
// Types
import { Comment } from "../../types/typing";

type Props = {
  comment: Comment;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const Comment = ({ comment, comments, setComments }: Props) => {
  const { data: session } = useSession();
  console.log(moment(comment.createdAt).format("DD MMMM [at] h:mm"), "Comment");

  const handleCommentLike = async () => {
    if (session?.user?._id) {
      if (useCheckIfChecked(comment.likes, session?.user?._id as string)) {
        const data = await removeCommentLike(
          comment._id,
          session?.user?._id,
          comments
        );
        data?.comments
          ? setComments(data.comments)
          : console.log("an errro occured please try again later");
      } else {
        const data = await addCommentLike(
          comment._id,
          session?.user._id,
          comments
        );
        data?.comments
          ? setComments(data.comments)
          : console.log("an errro occured please try again later");
      }
    } else {
      console.log("error: you should be connected to like");
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-start my-2 "
    >
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
          <p className="text-gray mt-1">{comment.text}</p>
        </div>
        {/* comment infos */}
        <div className="text-xs text-gray4 font-semibold flex items-center">
          <button
            onClick={handleCommentLike}
            type="button"
            className={`flex items-center ${
              useCheckIfChecked(comment.likes, session?.user?._id as string) &&
              "text-red"
            }`}
          >
            <div className="h-4">
              <OutlineHeartIcon />
            </div>
            <p>
              {useCheckIfChecked(comment.likes, session?.user?._id as string)
                ? "Like(d)"
                : "like"}
            </p>
          </button>

          <p className={` ml-2`}>{comment.likes.length} Likes</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
