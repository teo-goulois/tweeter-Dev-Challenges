import { useSession } from "next-auth/react";
import React, { useContext, useRef, useState } from "react";
// Icons
import { ImageIcon } from "../../icons/Icons";
// components
import AddImageModal from "../createTweet/AddImageModal";
// types
import { Comment as CommentType, Tweet } from "../../types/typing";
import { TweetContext } from "../../context/TweetProvider";

type Props = {
  tweetID: string;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

const Reply = ({ tweetID, setComments }: Props) => {
  const { setActiveTweet } = useContext(TweetContext);
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();

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
      author: session?.user?._id,
      image: image,
    };
    const response = await fetch(`/api/tweets/postComment`, {
      body: JSON.stringify(body),
      method: "POST",
    });
    if (response.status === 200) {
      const data = await response.json();
      /*   setComments((prev) => [
        { ...data.comment, author: session?.user },
        ...prev,
      ]); */

      setActiveTweet((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          comments: [
            { ...data.comment, author: session?.user },
            ...prev.comments,
          ],
        };
      });
      setInput("");
      setImage("");
    } else {
      console.log("an error occured plase try again later");
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
              src={session?.user?.image ?? ""}
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
