import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { mutate } from "swr";
// Icons
import { FollowIcon } from "../../icons/Icons";
// Types
import { User } from "../../types/typing";
// Hooks
import { key } from "../../utils/explore/useTweets";
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {
  people: User;
  input: string;
};

const PeopleCard = ({ people, input }: Props) => {
  const { user } = useConnectedUser();

  const handleFollow = async () => {
    if (!user) return toast.error("you should be connected to do this");
    const response = await fetch(
      `/api/users/follow?userID=${people?._id}&myID=${user?._id}`
    );
    const data = await response.json();
    if (response.status === 200) {
      // mutate user
      mutate(key("people", input), async (peoples: User[]) => {
        let newPeople = peoples.find((item) => item._id === people._id);
        if (!newPeople) return toast.error("tweet not found");
        newPeople.follower = [...newPeople.follower, user._id];
        return peoples;
      });

      // mutate connected User
      mutate(user ? `/api/user/${user._id}` : null, async (user: User) => {
        return { ...user, following: [...user.following, user._id] };
      });
    } else {
      toast.error(data.message);
    }
  };
  const handleUnfollow = async () => {
    if (!user) return toast.error("you should be connected to do this");
    const response = await fetch(
      `/api/users/unfollow?userID=${people?._id}&myID=${user?._id}`
    );
    const data = await response.json();

    if (response.status === 200) {
      // mutate user
      mutate(key("people", input), async (peoples: User[]) => {
        let newpeople = peoples.find((item) => item._id === people._id);
        if (!newpeople) return toast.error("people not found");
        newpeople.follower = newpeople.follower.filter(
          (id: string) => id !== user._id
        );
        return peoples;
      });
      // mutate connected User
      mutate(user ? `/api/user/${user._id}` : null, async (user: User) => {
        const newFollowing = user.following.filter((id) => id !== user?._id);
        return { ...user, following: [...newFollowing] };
      });
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="mb-4 p-4 w-full  border bg-white border-white hover:shadow rounded-lg ">
        <div className="flex items-center justify-between  ">
          <div className="flex items-center justify-start">
            {/* image */}
            <div className="w-10 h-10 bg-[#C4C4C4] rounded-lg mr-2 overflow-hidden">
              <img src={people.image} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <Link href={`/profile/${people._id}`}>
                  <a className="text-black font-medium font-[Poppins] ">
                    {people.name}
                  </a>
                </Link>
                <p className="text-xs text-secondary font-medium ml-2">
                  | {people.follower.length} followers |{" "}
                  {people.following.length} following
                </p>
              </div>
              <p className="text-sm text-primary font-medium">
                {people.bio ?? "no bio for this user"}
              </p>
            </div>
          </div>

          {user && people.follower.includes(user._id) ? (
            <button
              type="button"
              onClick={handleUnfollow}
              className="bg-blue flex items-center text-white px-4 py-2 rounded-[4px] relative z-10 "
            >
              <p>unfollow</p>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFollow}
              className="bg-blue flex items-center text-white px-4 py-2 rounded-[4px] relative z-10 "
            >
              <div className="h-6 mr-2">
                <FollowIcon />
              </div>
              <p>Follow</p>
            </button>
          )}
        </div>
        {/* desc */}
        <p className="font-medium text-sm text-secondary my-2">{people.bio}</p>
        {/* image */}
        <div className="bg-[#C4C4C4] h-[78px] rounded-lg overflow-hidden">
          <img src={people.banner} alt="people banner" />
        </div>
      </div>
    </>
  );
};

export default PeopleCard;
