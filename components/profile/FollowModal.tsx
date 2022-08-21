import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
// Icons
import { CloseIcon } from "../../icons/Icons";
// Types
import { User } from "../../types/typing";
// data relative
import useFollow from "../../utils/profile/useFollow";
import useUser from "../../utils/users/useUser";
// Components
import PeopleCard from "../explore/PeopleCard";
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  action: string | null;
};

const FollowModal = ({ setIsOpen, action }: Props) => {
  const router = useRouter();
  const { user: currentUser } = useConnectedUser();
  const { user, isError } = useUser(router.query.id as string);
  // TODO: useinfite
  const { followings, isLoading } = useFollow(
    router.query.id ? (router.query.id as string) : currentUser?._id,
    action
  );

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className="fixed  w-screen h-screen top-0 left-0 bg-secondary/30 z-[1] "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-lg shadow-sm my-auto p-4 w-[90%] md:w-[65%] lg:w-[50%] h-[500px] flex flex-col mx-auto translate-y-1/2 "
      >
        <div className="flex justify-between">
          <p className="font-['Poppins'] font-semibold text-xs text-primary">
            {user?.name}{" "}
            {action === "getFollowers" ? "follower are" : "is following"}
          </p>
          <button
            type="button"
            aria-label="close"
            onClick={() => setIsOpen((prev) => !prev)}
            className="h-6 text-gray"
          >
            <CloseIcon />
          </button>
        </div>

        {isLoading ? (
          <div className="w-full h-[150px] bg-[#d8d8d8] animate-pulse rounded-xl mb-4"></div>
        ) : !followings ? (
          <>
            <div id="divider" className="border border-gray3 my-2"></div>
            <p>no {action === "getFollowers" ? "follower" : "following"} </p>
          </>
        ) : followings.length == 0 ? (
          <>
            <div id="divider" className="border border-gray3 my-2"></div>
            <p>no {action === "getFollowers" ? "follower" : "following"} </p>
          </>
        ) : (
          followings.map((people) => {
            return (
              <div key={people._id}>
                <div id="divider" className="border border-gray3 my-2"></div>
                <PeopleCard input="" people={people} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FollowModal;
