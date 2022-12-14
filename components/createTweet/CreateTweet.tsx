import React, { useState } from "react";
import { useSWRConfig } from "swr";
// Icons
import { EarthIconerre, ImageIcon, PeopleIcon } from "../../icons/Icons";
// Components
import ReplyModal from "./WhoCanReplyModal";
import AddImageModal from "./AddImageModal";
import ProfileImage from "../global/ProfileImage";
// Hooks
import useAutoIncreaseHeight from "../../hooks/useAutoIncreaseHeight";
import useConnectedUser from "../../utils/users/useConnectedUser";
// Types
import { Tweet, User } from "../../types/typing";
import { key } from "../../utils/profile/useTweets";
import toast from "react-hot-toast";
import Backdrop from "../backdrop/BackdropModal";
import useModal from "../../hooks/useModal";
import AnimationContainer from "../global/AnimationContainer";

type OpenModal = {
  isOpen: boolean;
  value: string;
};

type Props = {
  fromProfile?: boolean;
  filter?: "tweets" | "replies" | "media" | "likes";
  uploadTweet: ({
    fromProfile,
    filter,
    body,
    user,
  }: {
    fromProfile: boolean | undefined;
    filter: string | undefined;
    body: {
      text: string;
      author: string | undefined;
      media: {
        images: string[];
      };
      everyoneCanReply: boolean;
    };
    user: User;
  }) => Promise<void>;
};

const CreateTweet = ({ fromProfile, filter, uploadTweet }: Props) => {
  // Context
  const { user } = useConnectedUser();
  // state
  const { modalOpen, close, open } = useModal();
  const [openModal, setOpenModal] = useState<OpenModal>({
    isOpen: false,
    value: "everyone",
  });

  const [input, setInput] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const textareaRef = useAutoIncreaseHeight(input);

  const addImageToTweet = (
    value: string
  ) => {
    setImages((prev) => [value, ...prev]);
    close();
  };

  const handleSubmitTweet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toast.error("you sould be connected to post a Tweet");
    if (input.length === 0 && images.length === 0)
      return toast.error("you sould write somethings to post a Tweet");

    const body = {
      text: input,
      author: user?._id,
      media: {
        images: images,
      },
      everyoneCanReply: openModal.value === "everyone" ? true : false,
    };
    uploadTweet({
      body,
      filter,
      fromProfile,
      user,
    });

    // reinitialize input fomrs
    setInput("");
    setImages([]);
  };

  if (!user) return <div></div>;
  return (
    <>
      <AnimationContainer>
        {modalOpen && (
          <Backdrop onClick={close}>
            <AddImageModal
              isOpen={modalOpen}
              close={close}
              addImageToTweet={addImageToTweet}
            />
          </Backdrop>
        )}
      </AnimationContainer>
      
      {openModal.isOpen && (
        <div
          onClick={() =>
            setOpenModal((prev) => ({
              ...prev,
              isOpen: !prev.isOpen,
            }))
          }
          className="fixed w-screen h-screen left-0 top-0 z-[2]"
        ></div>
      )}
      {/* Container */}
      <div className="bg-white min-w-[400px] w-full rounded-xl p-4 font-[Noto Sans] relative mb-2 flex flex-col justify-between">
        <h3 className="font-semibold text-primary font-[Poppins] capitalize">
          Tweet something
        </h3>
        <div id="divider" className="w-full border border-gray3 my-2" />
        {/* form */}
        <form onSubmit={handleSubmitTweet}>
          <div className="flex">
            {/* image */}
            <ProfileImage url={user.image} />

            <textarea
              aria-label="Write your tweet"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              ref={(element) => {
                textareaRef.current = element;
              }}
              className="font-medium text-secondary p-2 outline-none w-full resize-none overflow-hidden  mb-2"
              placeholder="Whats's happening?"
            ></textarea>
          </div>

          {/* image in tweets */}
          {images.length > 0 && (
            <div
              id="my-container"
              className="aspect-[4/2] rounded-2xl flex flex-col max-h-80 flex-wrap gap-2 overflow-hidden w-full mb-2"
            >
              {images.map((image, index) => {
                return (
                  <div key={image} className="relative  min-h-[20px] flex-1 basis-2/5 ">
                    <img
                      key={index}
                      className="h-full object-cover absolute w-full"
                      src={image}
                      alt="tweet image"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-blue flex items-center">
              <button
                type="button"
                onClick={open}
                className="h-6 w-6 mr-2 cursor-pointer"
                aria-label="add image"
              >
                <ImageIcon />
              </button>
              {/* --------- */}
              <button
                type="button"
                onClick={() => {
                  setOpenModal((prev) => ({ ...prev, isOpen: !prev.isOpen }));
                }}
                className=" flex items-center relative"
              >
                <div className="h-6 w-6">
                  {openModal.value === "everyone" ? (
                    <EarthIconerre />
                  ) : (
                    <PeopleIcon />
                  )}
                </div>
                <p className="text-xs font-medium pl-1">
                  {openModal.value === "everyone"
                    ? "Everyone can reply"
                    : "Your Followers can reply"}
                </p>
              </button>
              {/* modale */}
            </div>
            <button
              type="submit"
              className="bg-blue text-white rounded-[4px] px-6 py-2 cursor-pointer "
            >
              Tweet
            </button>
          </div>
        </form>
        {openModal.isOpen && <ReplyModal setOpenModal={setOpenModal} />}
      </div>
    </>
  );
};

export default CreateTweet;
