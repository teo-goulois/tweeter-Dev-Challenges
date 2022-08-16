import FsLightbox from "fslightbox-react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { OptionsVerticalIcons } from "../../icons/Icons";
import OptionModal from "./OptionModal";
import Reply from "./Reply";
import TweetInfos from "./SingleTweetInfos";
import Comment from "./Comment";
import { Comment as CommentType, Tweet } from "../../types/typing";
import ProfileImage from "../global/ProfileImage";
import UserInfos from "./UserInfos";
import ImagesViewer from "./ImagesViewer";

type Props = {
  tweet: Tweet;
};

const SingleTweet = ({ tweet }: Props) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [toggler, setToggler] = useState(false);
  const [commentIsOpen, setCommentIsOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [optionModalIsOpen, setOptionModalIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* overlay when modal is open */}
      {optionModalIsOpen && (
        <div
          onClick={() => setOptionModalIsOpen((prev) => !prev)}
          className="fixed w-screen h-screen left-0 top-0 z-[1]"
        ></div>
      )}

      {/* manage images preview */}
      {tweet.media.isMedia && (
        <FsLightbox toggler={toggler} sources={tweet.media.images} />
      )}

      {/* Tweet Component */}

      <div className="w-full hover:shadow-sm bg-white p-4 rounded-lg shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] relative  mb-4 border  border-gray4 ">
        {optionModalIsOpen && (
          <OptionModal
            setOptionModalIsOpen={setOptionModalIsOpen}
            tweetID={tweet._id}
          />
        )}
        {/* author */}
        <UserInfos tweet={tweet} />

        {/* options if it is your tweet */}
        {tweet.author?._id === user?._id && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOptionModalIsOpen((prev) => !prev);
            }}
            className="h-9 w-9 text-primary hover:bg-gray3 p-2 rounded-full absolute right-4 top-4"
          >
            <OptionsVerticalIcons />
          </button>
        )}

        {/* text */}
        <div className="my-2">
          <p className="text-gray">{tweet.text ?? ""}</p>
          {/* image */}
          {tweet.media.isMedia && (
            <ImagesViewer images={tweet.media.images} setToggler={setToggler} />
          )}
        </div>

        {/* tweet infos */}
        <TweetInfos
          tweet={tweet}
          comments={comments.length}
          setCommentIsOpen={setCommentIsOpen}
        />
        {/* reply */}
        {commentIsOpen && (
          <>
            <Reply tweetID={tweet._id} setComments={setComments} />
            <div className="border border-gray3 w-full mb-2"></div>
          </>
        )}

        {/* comments */}
        {tweet.comments.length > 0 &&
          tweet.comments.map((comment) => (
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

export default SingleTweet;
