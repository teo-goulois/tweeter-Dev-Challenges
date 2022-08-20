import React, { useContext } from "react";
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
import { TweetContext } from "../../context/TweetProvider";
import useConnectedUser from "../../utils/users/useConnectedUser";
import toast from "react-hot-toast";

type Props = {
  comment: Comment;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const Comment = ({ comment, comments, setComments }: Props) => {
  const { user } = useConnectedUser();
  const { data: session } = useSession();
  const { setActiveTweet } = useContext(TweetContext);

  const handleCommentLike = async () => {
    if (!user)
      return toast.error(`you should be connected to like this comment`);
    if (comment.likes.includes(user._id)) {
      // TODO use SWR
      const data = await removeCommentLike(
        comment._id,
        user._id,
        comments
      );
      data?.comments
        ? setActiveTweet((prev) => {
            if (!prev) return prev;
            const comments = prev?.comments.map((item) => {
              if (item._id === comment._id) {
                return {
                  ...item,
                  likes: [
                    ...item.likes.filter(
                      (like) => like._id !== session.user._id
                    ),
                  ],
                };
              }
              return item;
            });
            return { ...prev, comments: comments };
          })
        : console.log("an errro occured please try again later");
    } else {
      const data = await addCommentLike(
        comment._id,
        session?.user._id,
        comments
      );
      data?.comments
        ? setActiveTweet((prev) => {
            if (!prev) return prev;
            const comments = prev?.comments.map((item) => {
              if (item._id === comment._id) {
                return {
                  ...item,
                  likes: [
                    ...item.likes,
                    {
                      _id: session.user._id,
                    },
                  ],
                };
              }
              return item;
            });
            return { ...prev, comments: comments };
          })
        : console.log("an errro occured please try again later");
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
              useCheckIfChecked(comment.likes, user._id as string) &&
              "text-red"
            }`}
          >
            <div className="h-4">
              <OutlineHeartIcon />
            </div>
            <p>
              {useCheckIfChecked(comment.likes, user._id as string)
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
