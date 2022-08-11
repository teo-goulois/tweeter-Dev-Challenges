import React, { Dispatch, SetStateAction, useRef } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  imageURL: string | null;
  addImageToTweet: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: React.RefObject<HTMLInputElement>
  ) => void;
};

const AddImageModal = ({
  isOpen,
  addImageToTweet,
  setIsOpen,
  imageURL,
}: Props) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  if (isOpen) {
    return (
      <div className="fixed w-screen h-screen top-0 left-0 bg-black/20 z-10 flex items-center justify-center">
        <form className="bg-white md:max-w-[50%] w-[70%] rounded-xl p-4 font-[Noto Sans] relative flex justify-between ">
        <button className="absolute right-0 -top-12 bg-white px-4 py-2 rounded-lg text-primary font-semibold " onClick={() => setIsOpen(false)}>close</button>
          <input
            className="bg-gray3 p-2 w-full rounded-lg outline-1 outline-gray"
            ref={imageInputRef}
            type="text"
            placeholder="Enter Image url"
          />
          <button
            className="bg-blue text-white rounded-[4px] px-6 py-2 cursor-pointer ml-2 whitespace-nowrap"
            onClick={(e) => addImageToTweet(e, imageInputRef)}
            type="submit"
          >
            Add Image
          </button>
        </form>
      </div>
    );
  }
  return <></>;
};

export default AddImageModal;
