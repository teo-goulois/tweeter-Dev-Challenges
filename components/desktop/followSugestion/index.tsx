import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { User } from "../../../types/typing";
import { fetchFollowSugestions } from "../../../utils/widget/fetchFollowSugestions";
// Components
import FollowCard from "./FollowCard";

const FollowSugestion = () => {
  const { data: session } = useSession();

  const [followSugestions, setFollowSugestions] = useState<User[]>([]);

  const fetchUsers = async (userID: string | undefined) => {
    const response = await fetchFollowSugestions(userID);
    setFollowSugestions(response);
  };

  useEffect(() => {
    session?.user._id && fetchUsers(session?.user._id);
  }, [session?.user._id]);

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] min-w-[306px] p-4 mt-2">
      <h1 className="font-[Poppins] font-semibold text-xs">Who to follow</h1>
      {/* divider */}
      <div className="border border-gray3 my-2"></div>
      {/* divider */}
      {followSugestions.length > 0 ? (
        followSugestions.map((user) => {
          return (
            <FollowCard
              key={user._id}
              user={user}
              fetchFollowSugestions={fetchUsers}
            />
          );
        })
      ) : (
        <p className="text-sm font-medium text-primary">
          no sugestions for now{" "}
        </p>
      )}
    </div>
  );
};

export default FollowSugestion;
