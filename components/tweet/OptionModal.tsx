import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setOptionModalIsOpen: Dispatch<SetStateAction<boolean>>;
  tweetID: string;
};

const OptionModal = ({ setOptionModalIsOpen, tweetID }: Props) => {
  const handleDelete = async () => {
    const res = confirm("do you really want to delete ?");
    if (res) {
      // delete tweet
      console.log("delete", tweetID);
    }
    setOptionModalIsOpen((prev) => !prev);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-[2] min-w-[192px] absolute top-[5rem] right-[1rem] bg-white rounded-xl p-1 border border-[#E0E0E0] shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] "
    >
      <button
        onClick={handleDelete}
        type="button"
        className="text-red hover:bg-gray3 w-full py-2 rounded-xl font-medium"
      >
        Delete
      </button>
    </div>
  );
};

export default OptionModal;
