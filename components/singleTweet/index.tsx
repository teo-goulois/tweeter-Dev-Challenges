import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
// Icons
import { OptionsVerticalIcons } from "../../icons/Icons";
// Components
import OptionModal from "../tweet/OptionModal";
import Reply from "./Reply";
import TweetInfos from "./SingleTweetInfos";
import Comment from "./Comment";
import UserInfos from "../tweet/UserInfos";
import ImagesViewer from "../tweet/ImagesViewer";
// Types
import { Comment as CommentType, Tweet } from "../../types/typing";
// data relative
import useComments from "../../utils/comments/useComments";
import useConnectedUser from "../../utils/users/useConnectedUser";
import { mutate } from "swr";
import { key } from "../../utils/comments/useComments";
import useInfiniteComment from "../../utils/comments/useInfiniteComments";

type Props = {
  tweet: Tweet;
};

const SingleTweet = ({ tweet }: Props) => {
  const { user } = useConnectedUser();

  const [toggler, setToggler] = useState(false);
  const [commentIsOpen, setCommentIsOpen] = useState<boolean>(false);
  const [optionModalIsOpen, setOptionModalIsOpen] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  //const { comments, isLoading } = useComments(tweet._id);
  const {
    comments,
    commentsIsEmpty,
    commentsIsError,
    commentsIsLoading,
    commentsIsLoadingMore,
    commentsIsReachingEnd,
    commentsIsRefreshing,
    setSize,
    addComment,
    handleLike,
  } = useInfiniteComment(tweet._id, 6);

  const handleFetch = () => {
    setSize((prev) => prev + 1);
  };

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

      <div className="mb-14 md:mb-0 w-full max-w-5xl hover:shadow-sm bg-white p-4 rounded-lg shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] relative  mb-4 border  border-gray4 ">
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
        <TweetInfos tweet={tweet} setCommentIsOpen={setCommentIsOpen} />
        {/* reply */}
        {commentIsOpen && (
          <>
            <Reply addComment={addComment} tweetID={tweet._id} />
            <div className="border border-gray3 w-full mb-2"></div>
          </>
        )}

        {/* comments */}
        {commentsIsLoading ? (
          <div>loading...</div>
        ) : (
          <div className="">
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                handleLike={handleLike}
              />
            ))}
            {!commentsIsReachingEnd && !commentsIsEmpty && (
              <div className="w-full flex justify-center">
                <button
                  className="px-6 py-4 border border-gray3 mx-auto"
                  type="button"
                  onClick={handleFetch}
                >
                  load more
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SingleTweet;
