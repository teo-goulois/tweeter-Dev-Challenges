import { useSession } from "next-auth/react";
import React from "react";
// Icons
import { FollowIcon } from "../../../icons/Icons";
import { User } from "../../../types/typing";

type Props = {
  user: User;
  fetchFollowSugestions: (userID: string | undefined) => Promise<void>;
};

const FollowCard = ({ user, fetchFollowSugestions }: Props) => {
  const { data: session  } = useSession();
  const handleFollow = async () => {
    const response = await fetch(
      `/api/users/follow?userID=${user._id}&myID=${session?.user._id}`
    );
    const data = await response.json();
    fetchFollowSugestions(session?.user._id);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          {/* image */}
          <div className="w-10 h-10 bg-[#C4C4C4] rounded-lg mr-2 overflow-hidden">
            <img src={user.image} alt="" />
          </div>
          <div>
            <h1 className="text-black font-medium font-[Poppins] ">
              {user.name}
            </h1>
            <p className="text-xs text-secondary font-medium">
              {user.follower.length} followers
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleFollow}
          className="bg-blue flex items-center text-white px-4 py-2 rounded-[4px] "
        >
          <div className="h-6 mr-2">
            <FollowIcon />
          </div>
          <p>Follow</p>
        </button>
      </div>
      {/* desc */}
      <p className="font-medium text-sm text-secondary my-2">{user.bio}</p>
      {/* image */}
      <div className="bg-[#C4C4C4] w-full h-[78px] rounded-lg overflow-hidden">
        <img src={user.banner} alt="user banner" />
      </div>
    </div>
  );
};

export default FollowCard;
