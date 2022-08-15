import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import FsLightbox from "fslightbox-react";
// Types
import { Comment as CommentType, Tweet } from "../../types/typing";
// Hooks
import { fetchComments } from "../../utils/fetchComments";
// Components
import Comment from "./Comment";
import Reply from "./Reply";
import TweetInfos from "./TweetInfos";
import { AuthContext } from "../../context/AuthProvider";
import { useRouter } from "next/router";

type Props = {
  tweet: Tweet;
};

const Tweet = ({ tweet }: Props) => {
  const router = useRouter()
  const { user } = useContext(AuthContext);
  const [toggler, setToggler] = useState(false);
  const [commentIsOpen, setCommentIsOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    
  }

  return (
    <>
      {/* Retweet */}
      {/*  <div className="flex items-center text-sm text-secondary my-2">
        <div className="h-4 mr-2 rotate rotate-2 ">
          <RetweetIcon />
        </div>
        <p> Daniel Jensen Retweeted</p>
      </div> */}
      {tweet.media.isMedia && (
        <FsLightbox toggler={toggler} sources={tweet.media.images} />
      )}

      <div onClick={(e) => router.push(`/tweets/${tweet._id}`)} className="w-full  bg-white p-4 rounded-lg shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] relative z-0 mb-4">
        {/* author */}
        <div className="flex items-center">
          {/* image */}
          <div className="w-10 h-10 bg-gray rounded-lg mr-2">
            <img src={tweet.author?.image} alt="" />
          </div>
          {/* username and date */}
          <div>
            <h3 className="font-[Poppins] text-black font-medium ">
              {tweet.author?.name}
            </h3>
            <p className="font-medium text-xs text-gray4">
              {moment(tweet._createdAt).format("DD MMMM [at] h:mm")}
            </p>
          </div>
        </div>
        {/* text */}
        <div className="my-2">
          <p className="text-gray">{tweet.text ?? ''}</p>
          {/* image */}

          {tweet.media.isMedia && (
            <div
              onClick={() => setToggler((prev) => !prev)}
              id="my-container"
              className="aspect-[4/2] rounded-2xl flex flex-col h-[300px] flex-wrap gap-2 overflow-hidden w-full"
            >
              {tweet.media.images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="relative  min-h-[20px] flex-1 basis-2/5 "
                  >
                    <img
                      className="h-full object-cover absolute w-full"
                      src={image ?? ""}
                      alt="tweet image"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* tweet infos */}
        <TweetInfos tweet={tweet} comments={comments.length} setCommentIsOpen={setCommentIsOpen} />
        {/* reply */}
        {commentIsOpen && (
          <>
            <Reply tweetID={tweet._id} setComments={setComments} />
            <div className="border border-gray3 w-full mb-2"></div>
          </>
        )}
        {/* comments */}
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              comments={comments}
              setComments={setComments}
            />
          ))}
      </div>
    </>
  );
};

export default Tweet;
