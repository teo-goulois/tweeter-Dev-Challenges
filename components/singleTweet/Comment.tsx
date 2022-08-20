import React from "react";
import moment from "moment";
import { mutate } from "swr";
import toast from "react-hot-toast";
// Hooks
import useConnectedUser from "../../utils/users/useConnectedUser";
import { key } from "../../utils/comments/useComments";
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
  const { user } = useConnectedUser();

  const handleCommentLike = async () => {
    if (!user)
      return toast.error(`you should be connected to like this comment`);
    if (comment.likes.includes(user._id)) {
      // TODO use SWR
      const response = await fetch(
        `/api/tweets/removeCommentLike?commentID=${comment._id}&userID=${user._id}`
      );
      const data = await response.json();
      if (response.status === 200) {
        mutate(key(comment.tweet), async (comments: Comment[]) => {
          console.log(comments, "mutate comment remove like");
          let newComments = comments.find((item) => item._id === comment._id);
          if (!newComments) return toast.error("comment not found");
          newComments.likes = newComments.likes.filter(
            (id: string) => id !== user._id
          );
          return comments;
        });
      } else {
        return toast.error(data.message);
      }
    } else {
      const response = await fetch(
        `/api/tweets/addCommentLike?commentID=${comment._id}&userID=${user._id}`
      );
      const data = await response.json();
      if (response.status === 200) {
        mutate(key(comment.tweet), async (comments: Comment[]) => {
          let newComments = comments.find((item) => item._id === comment._id);
          if (!newComments) return toast.error("tweet not found");
          newComments.likes = [...newComments.likes, user._id];
          return comments;
        });
      } else {
        return toast.error(data.message);
      }
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