import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AddFileIcon, CloseIcon } from "../../icons/Icons";

type Props = {
  isOpen: boolean;
  close: () => void;
  addImageToTweet: (value: string) => void;
};

const AddImageModal = ({ isOpen, addImageToTweet, close }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>("");
  const [state, setState] = useState<"upload" | "uploading" | "uploaded">(
    "upload"
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      handleSubmit(file);
    }
  }

  const handleUrlSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    addImageToTweet(input);
  };

  const handleSubmit = async (file: File) => {
    setState("uploading");
    const formData = new FormData();

    formData.append("file", file);
    try {
      const res = await fetch(`/api/upload/image`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.status === 200) {
        addImageToTweet(data.data.url);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.log(err, "error when uploading image");
    }
  };

  const handleOndragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleOndrop = (event: React.DragEvent<HTMLDivElement>) => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    //let's grab the image file
    let file = event.dataTransfer.files[0];

    handleSubmit(file);
  };

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="bg-white md:max-w-[50%] lg:max-w-2xl w-[70%] rounded-xl font-[Noto Sans] relative flex flex-col justify-between "
    >
      <header className="flex justify-between items-center text-primary p-4">
        <h1 className="font-bold ">Upload Image</h1>
        <button
          type="button"
          className="h-10 w-10  p-2 rounded-lg  font-semibold hover:bg-gray3 transition-colors"
          onClick={close}
        >
          <CloseIcon />
        </button>
      </header>

      <div id="divider" className="border border-gray3" />

      <div className="p-4">
        <input
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          type="file"
          name="image"
          id="image"
          onChange={handleChange}
        />
        <div
          onDragOver={handleOndragOver}
          onDrop={handleOndrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 group border-dashed border-gray3 hover:border-blue transition-colors flex flex-col justify-center items-center p-4 rounded-lg"
        >
          <div className="h-12 text-secondary group-hover:text-blue transition-colors">
            <AddFileIcon />
          </div>
          <h2 className="font-semibold text-primary text-lg group-hover:text-blue transition-colors">
            Select a Image file to upload
          </h2>
          <p className="text-secondary text-sm">or drag and drop it here</p>
        </div>

        <h3 className="text-primary font-medium mt-4">Or upload from a URL</h3>
        <div className="flex p-1 border border-gray3 rounded-lg">
          <input
            className="bg-gray3 p-2 w-full rounded-lg outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter Image url"
          />
          <button
            disabled={input.length === 0}
            className="bg-blue text-white rounded-[4px] px-6 py-2 cursor-pointer ml-2 whitespace-nowrap disabled:bg-gray4 disabled:cursor-not-allowed transition-colors"
            onClick={handleUrlSubmit}
            type="button"
          >
            Add Image
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddImageModal;
