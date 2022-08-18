import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { User } from "../../../types/typing";
import useUser from "../../../utils/home/useUser";
import { fetchFollowSugestions } from "../../../utils/widget/fetchFollowSugestions";
import useFollowSugestions from "../../../utils/widget/useFollowSugestions";
// Components
import FollowCard from "./FollowCard";

const FollowSugestion = () => {
  const { user } = useUser();

  // const [followSugestions, setFollowSugestions] = useState<User[]>([]);

  const { followSugestions, isError, isLoading } = useFollowSugestions(
    user?._id
  );
  console.log(followSugestions, "followSugestions");

  // console.log(followSugestions, "followSugestions");

  /* const fetchUsers = async (userID: string | undefined) => {
    const response = await fetchFollowSugestions(userID);
    setFollowSugestions(response);
  }; */

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] min-w-[306px] p-4 mt-2">
      <h1 className="font-[Poppins] font-semibold text-xs">Who to follow</h1>
      {/* divider */}
      <div className="border border-gray3 my-2"></div>
      {/* divider */}
      {isLoading ? (
        <p>Loading</p>
      ) : isError ? (
        <p>Error</p>
      ) : followSugestions && followSugestions.length > 0 ? (
        followSugestions.map((user, index) => {
          return <FollowCard key={index} user={user} />;
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
