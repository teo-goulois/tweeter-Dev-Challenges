import { useSession } from "next-auth/react";
import React from "react";
import { ImageIcon } from "../../icons/Icons";

const Reply = () => {
  const { data: session } = useSession();
  return (
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
          className="w-full bg-gray2 p-2 outline-none"
          placeholder="Tweet your reply"
          type="text"
        />
        <button className="h-4 cursor-pointer pr-2">
          <ImageIcon />
        </button>
      </div>
    </div>
  );
};

export default Reply;
