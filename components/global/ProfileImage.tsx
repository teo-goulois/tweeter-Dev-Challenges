import React from "react";

type Props = {
  url: string | undefined;
};

const ProfileImage = ({ url }: Props) => {
  return (
    <div className="w-10 h-10 bg-[#C4C4C4] rounded-lg overflow-hidden">
      <img
        className="h-full w-full object-cover object-center"
        src={url ?? "https://vectorified.com/images/default-user-icon-33.jpg"}
        alt="user"
      />
    </div>
  );
};

export default ProfileImage;
