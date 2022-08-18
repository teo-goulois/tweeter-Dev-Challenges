import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { useSWRConfig } from "swr";
import { AuthContext } from "../../../context/AuthProvider";
// Icons
import { FollowIcon } from "../../../icons/Icons";
import { User } from "../../../types/typing";
import useUser from "../../../utils/home/useUser";

type Props = {
  user: User;
  //fetchFollowSugestions: (userID: string | undefined) => Promise<void>;
};

const FollowCard = ({ user /* fetchFollowSugestions */ }: Props) => {
  const { mutate } = useSWRConfig();
  const { user: currentUser } = useUser();
  const { setUser } = useContext(AuthContext);
  const { data: session } = useSession();

  const handleFollow = async () => {
    try {
      const response = await fetch(
        `/api/users/follow?userID=${user._id}&myID=${session?.user._id}`
      );
      const data = await response.json();

     

      mutate(currentUser ? `/api/user/${currentUser._id}` : null, async (user: User) => {
        console.log(user, 'USER');
        return {...user, following: [...user.following, user._id] }
        
      });

      mutate(
        currentUser?._id
          ? `/api/getFollowSugestions?userID=${currentUser._id}`
          : null,
        async ({ followSugestions }: { followSugestions: User[] }) => {
          console.log(followSugestions, "sugestion smutate");
          const newSugestions = followSugestions.filter(
            (sug) => sug._id !== user._id
          );
          console.log(newSugestions, "newSugestions");
          
          return newSugestions;
        }
      );

    } catch (err) {}
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
      <div className="bg-[#C4C4C4] w-full max-w-xs h-[78px] rounded-lg overflow-hidden">
        <img src={user.banner} alt="user banner" />
      </div>
    </div>
  );
};

export default FollowCard;
