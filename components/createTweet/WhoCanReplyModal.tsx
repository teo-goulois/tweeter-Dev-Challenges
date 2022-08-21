import React, { Dispatch, SetStateAction } from "react";
// Icons
import { EarthIconerre, PeopleIcon } from "../../icons/Icons";

type Props = {
  setOpenModal: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      value: string;
    }>
  >;
};
const ReplyModal = ({ setOpenModal }: Props) => {
  return (
    <div className="">
      <div className="min-h-[150px] min-w-[230px] bg-white rounded-xl border border-[#E0E0E0] absolute left-12 z-[2] p-2">
        <h3 className="font-[Poppins] text-xs font-semibold text-primary ">
          Who can reply?
        </h3>
        <p className="text-secondary text-xs mb-2">
          Choose who can reply to this Tweet.
        </p>

        <button
          onClick={() =>
            setOpenModal({
              isOpen: false,
              value: "everyone",
            })
          }
          type="button"
          className="flex items-center text-primary font-medium w-full p-4 rounded-lg hover:bg-gray3"
        >
          <div className="h-6 pr-2">
            <EarthIconerre />
          </div>
          <span>Everyone</span>
        </button>
        <button
          onClick={() =>
            setOpenModal({
              isOpen: false,
              value: "followed",
            })
          }
          type="button"
          className="flex items-center text-primary font-medium w-full p-4 rounded-lg hover:bg-gray3"
        >
          <div className="h-6 pr-2">
            <PeopleIcon />
          </div>
          <span>People you follow</span>
        </button>
      </div>
    </div>
  );
};

export default ReplyModal;
