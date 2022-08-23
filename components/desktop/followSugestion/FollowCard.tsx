import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
// Icons
import { FollowIcon } from "../../../icons/Icons";
// Types
import { User } from "../../../types/typing";
// Hooks
import useConnectedUser from "../../../utils/users/useConnectedUser";

type Props = {
  user: User;
};

const FollowCard = ({ user }: Props) => {
  const { mutate } = useSWRConfig();
  const { user: currentUser } = useConnectedUser();

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `/api/users/follow?userID=${user._id}&myID=${currentUser?._id}`
      );

      mutate(
        currentUser ? `/api/user/${currentUser._id}` : null,
        async (user: User) => {
          return { ...user, following: [...user.following, user._id] };
        }
      );

      mutate(
        currentUser?._id
          ? `/api/getFollowSugestions?userID=${currentUser._id}`
          : null,
        async ({ followSugestions }: { followSugestions: User[] }) => {
          const newSugestions = followSugestions.filter(
            (sug) => sug._id !== user._id
          );

          return newSugestions;
        }
      );
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    <div className="mb-4 border border-white hover:shadow rounded-lg ">
      <div className="flex items-center justify-between  ">
        <div className="flex items-center justify-start">
          {/* image */}
          <div className="w-10 h-10 bg-[#C4C4C4] rounded-lg mr-2 overflow-hidden">
            <img src={user.image} alt="" />
          </div>
          <div>
            <Link href={`/profile/${user._id}`}>
              <a className="text-black font-medium font-[Poppins] ">
                {user.name}
              </a>
            </Link>
            <p className="text-xs text-secondary font-medium">
              {user.follower.length} followers
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleFollow}
          className="bg-blue flex items-center text-white px-4 py-2 rounded-[4px] relative   "
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
      <div className="bg-[#C4C4C4] w-full max-w-xs h-[78px] rounded-lg overflow-hidden">
        <img src={user.banner} alt="user banner" />
      </div>
    </div>
  );
};

export default FollowCard;
