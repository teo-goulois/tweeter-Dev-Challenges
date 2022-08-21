import React, { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
// Images
import banner from "../../public/images/banner.svg";
// Icons
import { EditIcon, FollowIcon } from "../../icons/Icons";
// Types
import { User } from "../../types/typing";
// Components
import EditModal from "./EditModal";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {
  user: User | undefined;
};

const ProfileInfos = ({ user }: Props) => {
  const router = useRouter();
  const { user: currentUser } = useConnectedUser();

  const handleFollow = async () => {
    const response = await fetch(
      `/api/users/follow?userID=${user?._id}&myID=${currentUser?._id}`
    );
    const data = await response.json();

    // mutate user
    mutate(user?._id ? `/api/user/${user._id}` : null, async (user: User) => {
      return { ...user, follower: [...user.follower, currentUser?._id] };
    });

    // mutate connected User
    mutate(
      currentUser ? `/api/user/${currentUser._id}` : null,
      async (user: User) => {
        return { ...user, following: [...user.following, user._id] };
      }
    );
  };
  const handleUnfollow = async () => {
    const response = await fetch(
      `/api/users/unfollow?userID=${user?._id}&myID=${currentUser?._id}`
    );
    const data = await response.json();
    // mutate user
    mutate(user?._id ? `/api/user/${user._id}` : null, async (user: User) => {
      const newFollower = user.follower.filter((id) => id !== user?._id);
      return { ...user, follower: [...newFollower] };
    });
    // mutate connected User
    mutate(
      currentUser ? `/api/user/${currentUser._id}` : null,
      async (user: User) => {
        const newFollowing = user.following.filter((id) => id !== user?._id);
        return { ...user, following: [...newFollowing] };
      }
    );
  };
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);
  if (!user) return <p>Loading...</p>;
  return (
    <div>
      {editIsOpen && <EditModal user={user} setEditIsOpen={setEditIsOpen} />}
      {/* background */}
      <div className="bg-[#C4C4C4] w-full min-h-[168.06px] md:min-h-[297.51px] md:max-h-[300px] relative">
        <img
          className="w-full md:max-h-[300px] object-cover "
          src={user.banner ?? banner}
          alt="banner"
        />
      </div>

      <div className="px-4 flex justify-center ">
        <div className="flex md:flex-row flex-col items-center md:items-start justify-around md:justify-between  w-full md:max-w-[1450px] py-2 md:p-4  h-fit bg-white rounded-xl shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] -translate-y-6 relative">
          <div className="flex md:flex-row flex-col justify-start items-center md:items-start ">
            {/* image */}
            <div className="overflow-hidden w-[122.43px] h-[122.43px] -mt-[90px] md:-mt-[65px] block bg-[#C4C4C4] rounded-lg border-4 border-white shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)]">
              <img
                className="w-full h-full object-cover object-center"
                src={
                  user.image ??
                  "https://vectorified.com/images/default-user-icon-33.jpg"
                }
                alt="user"
              />
            </div>

            <div className="flex flex-col justify-between items-center md:items-start w-fit px-2 md:max-w-[70%] py-4 md:py-0">
              <div className="flex flex-col md:flex-row md:items-center">
                <h1 className="font-[Poppins] font-semibold text-2xl md:pr-4 text-center md:text-left ">
                  {user.name}
                </h1>
                {/* followers following */}
                <div className="flex items-center font-[Poppins] ">
                  <p className="font-medium text-xs text-secondary whitespace-nowrap flex">
                    <span className="font-semibold text-primary pr-2">
                      {user.following.length}
                    </span>{" "}
                    Following &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    <span className="font-semibold text-primary pr-2">
                      {user.follower.length}
                    </span>{" "}
                    Followers
                  </p>
                </div>
              </div>

              {/* bio */}
              <p className="text-secondary font-[Noto Sans] font-medium text-lg text-center md:text-left ">
                {user.bio}
              </p>
            </div>
          </div>
          {/* follow button */}
          {currentUser?._id === user._id ? (
            <button
              onClick={() => setEditIsOpen((prev) => !prev)}
              type="button"
              className="text-white font-[Noto Sans] text-xs font-medium bg-blue flex items-center px-6 py-2 rounded-[4px] "
            >
              <div className="h-6 mr-2">
                <EditIcon />
              </div>
              <p className="capitalize ">Edit</p>
            </button>
          ) : // if current user follow him return unfollow
          currentUser?.following.includes(router.query.id as string) ? (
            <button
              onClick={handleUnfollow}
              type="button"
              className="text-white font-[Noto Sans] text-xs font-medium bg-blue flex items-center px-6 py-3 rounded-[4px] "
            >
              <p className="capitalize ">unFollow</p>
            </button>
          ) : (
            <button
              onClick={handleFollow}
              type="button"
              className="text-white font-[Noto Sans] text-xs font-medium bg-blue flex items-center px-6 py-2 rounded-[4px] "
            >
              <div className="h-6 mr-2">
                <FollowIcon />
              </div>
              <p className="capitalize ">Follow</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfos;
