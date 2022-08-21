import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
import { useRouter } from "next/router";
// Types
import { Comment as CommentType, Tweet } from "../../types/typing";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";
// Components
import TweetInfos from "./TweetInfos";
import OptionModal from "./OptionModal";
import UserInfos from "./UserInfos";
// Icons
import { OptionsVerticalIcons } from "../../icons/Icons";

type Props = {
  tweet: Tweet;
  swrKey: string | (string | { method: string; body: string; })[] | null
};

const Tweet = ({ tweet, swrKey }: Props) => {
  const router = useRouter();
  const { user } = useConnectedUser();
  const [toggler, setToggler] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [optionModalIsOpen, setOptionModalIsOpen] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};

  return (
    <>
      {/* Retweet */}
      {/*  <div className="flex items-center text-sm text-secondary my-2">
        <div className="h-4 mr-2 rotate rotate-2 ">
          <RetweetIcon />
        </div>
        <p> Daniel Jensen Retweeted</p>
      </div> */}
      {optionModalIsOpen && (
        <div
          onClick={() => setOptionModalIsOpen((prev) => !prev)}
          className="fixed w-screen h-screen left-0 top-0 z-[1]"
        ></div>
      )}
      {tweet?.media?.isMedia && (
        <FsLightbox toggler={toggler} sources={tweet.media.images} />
      )}

      <div
        onClick={(e) => router.push(`/tweets/${tweet._id}`)}
        className="w-full hover:shadow-sm bg-white p-4 rounded-lg shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] relative  mb-4 border border-white hover:border-gray4"
      >
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

          {tweet?.media?.isMedia && (
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
        <TweetInfos swrKey={swrKey} tweet={tweet} comments={comments.length} />
      </div>
    </>
  );
};

export default Tweet;
