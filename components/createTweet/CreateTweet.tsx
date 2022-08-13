import React, { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { EarthIconerre, ImageIcon, PeopleIcon } from "../../icons/Icons";
import { fetchTweets } from "../../utils/fetchTweets";
import { TweetContext } from "../../context/TweetProvider";

import ReplyModal from "./WhoCanReplyModal";
import AddImageModal from "./AddImageModal";

type OpenModal = {
  isOpen: boolean;
  value: string;
};

const CreateTweet = () => {
  const { data: session } = useSession();
  const { setTweets } = useContext(TweetContext);
  // Ref
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);
  // state
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
  const [textareaHeight, setTextareaHeight] = useState<string>("auto");
  const [openModal, setOpenModal] = useState<OpenModal>({
    isOpen: false,
    value: "everyone",
  });

  const [input, setInput] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    e.preventDefault();
    setImages((prev) => [value, ...prev]);
    setImageUrlBoxIsOpen(false);
  };

  const handleSubmitTweet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      text: input,
      author: session?.user?._id,
      media: {
        images: images,
      },
    };
    const response = await fetch(`/api/tweets/postTweet`, {
      body: JSON.stringify(body),
      method: "POST",
    });
    const data = await response.json();
    setTweets((prev) => [{ ...data.tweet, author: session?.user }, ...prev]);
    setInput("");
    setImages([]);
  };

  return (
    <>
      <AddImageModal
        isOpen={imageUrlBoxIsOpen}
        setIsOpen={setImageUrlBoxIsOpen}
        addImageToTweet={addImageToTweet}
      />
      <div className="bg-white min-w-[400px] w-full rounded-xl p-4 font-[Noto Sans] relative ">
        <h3 className="font-semibold text-primary font-[Poppins]">
          Tweet something
        </h3>
        <div id="divider" className="w-full border border-gray3 my-2"></div>

        <form onSubmit={handleSubmitTweet}>
          <div className="flex">
            {/* image */}
            <div className="w-10 h-10 bg-[#C4C4C4] rounded-lg overflow-hidden">
              <img
                className="h-full w-full  object-center"
                src={session?.user?.image ?? ""}
                alt=""
              />
            </div>

            <textarea
              onChange={(e) => {
                setTextareaHeight(textareaRef.current?.scrollHeight + "px");
                setInput(e.target.value);
              }}
              style={{ height: textareaHeight }}
              ref={textareaRef}
              className="font-medium text-secondary p-2 outline-none w-full resize-none overflow-hidden"
              placeholder="Whats's happening?"
            ></textarea>
          </div>

          {/* image in tweets */}
          {images.length > 0 && (
            <div
              id="my-container"
              className="aspect-[4/2] rounded-2xl flex flex-col h-[300px] flex-wrap gap-2 overflow-hidden w-full mb-2"
            >
              {images.map((image, index) => {
                return (
                  <div className="relative  min-h-[20px] flex-1 basis-2/5 ">
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
                onClick={() => setImageUrlBoxIsOpen((prev) => !prev)}
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
