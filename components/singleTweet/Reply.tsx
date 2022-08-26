import React, { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
// Icons
import { ImageIcon } from "../../icons/Icons";
// components
import AddImageModal from "../createTweet/AddImageModal";
// types

// data relative
import { key } from "../../utils/comments/useComments";
import { key as keyCommentsLength } from "../../utils/comments/useCommentsLength";
import useConnectedUser from "../../utils/users/useConnectedUser";
import { User } from "../../types/typing";

type Props = {
  tweetID: string;
  addComment: (body: any, user: User) => Promise<string | any[] | undefined>;
};

const Reply = ({ tweetID, addComment }: Props) => {
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const { user } = useConnectedUser();

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    e.preventDefault();
    setImages((prev) => [value, ...prev]);
    setImageUrlBoxIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) return toast.error("you have to be sign in to comment");
    e.preventDefault();

    const body = {
      tweet: tweetID,
      text: input,
      author: user?._id,
      images: images,
    };

    addComment(body, user);

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
      <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="py-2 flex items-center font-[Noto Sans font-medium text-sm] ">
          {/* image */}
          <div className="w-10 h-10 bg-[#C4C4C4] rounded-lg overflow-hidden">
            <img
              className="h-full w-full  object-center"
              src={user?.image ?? ""}
              alt=""
            />
          </div>
          {/*  input */}
          <div className="bg-gray2 w-full flex justify-between items-center border border-gray3 rounded-lg  text-gray4">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="w-full bg-gray2 p-2 outline-none"
              placeholder="Tweet your reply"
              type="text"
            />

            <button
              type="button"
              onClick={() => setImageUrlBoxIsOpen((prev) => !prev)}
              aria-label="add image"
              className="h-4 cursor-pointer pr-2"
            >
              <ImageIcon />
            </button>
          </div>
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
        {input.length > 0 && (
          <button
            type="submit"
            className="py-2 px-4 rounded-lg bg-blue text-white font-medium block ml-auto mb-1"
          >
            Post
          </button>
        )}
      </form>
    </>
  );
};

export default Reply;
