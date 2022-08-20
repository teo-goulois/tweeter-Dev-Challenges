import React, { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
// Icons

// components
import AddImageModal from "../createTweet/AddImageModal";
// types

// Hooks
import { key } from "../../utils/comments/useComments";
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {
  tweetID: string;
};

const Reply = ({ tweetID }: Props) => {
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const { user } = useConnectedUser();

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    e.preventDefault();
    // set Imatge
    setImage(value);
    setImageUrlBoxIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      tweet: { _id: tweetID },
      text: input,
      author: user?._id,
      image: image,
    };
    const response = await fetch(`/api/tweets/postComment`, {
      body: JSON.stringify(body),
      method: "POST",
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data, "data add commment");

      // TODO: use SWR
      mutate(key(tweetID), async (comments: Comment[]) => {
        return [{ ...data.comment, author: user }, ...comments];
      }, {revalidate: false});

      setInput("");
      setImage("");
    } else {
      toast.error("an error occured plase try again later");
    }
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
            {/* <button
              type="button"
              onClick={() => setImageUrlBoxIsOpen((prev) => !prev)}
              aria-label="add image"
              className="h-4 cursor-pointer pr-2"
            >
              <ImageIcon />
            </button> */}
          </div>
        </div>
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
