import React from "react";

type Props = {
  images: string[];
  setToggler: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImagesViewer = ({ setToggler, images }: Props) => {
  return (
    <div
      onClick={() => setToggler((prev) => !prev)}
      id="my-container"
      className="aspect-[4/2] rounded-2xl flex flex-col max-h-80 flex-wrap gap-2 overflow-hidden w-full"
    >
      {images.map((image, index) => {
        return (
          <div key={index} className="relative  min-h-[20px] flex-1 basis-2/5 ">
            <img
              className="h-full object-cover absolute w-full"
              src={image ?? "http://www.fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"}
              alt="tweet image"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImagesViewer;
