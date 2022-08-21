import React from "react";
// Hooks
import useConnectedUser from "../../../utils/users/useConnectedUser";
import useFollowSugestions from "../../../utils/widget/useFollowSugestions";
// Components
import FollowCard from "./FollowCard";

const FollowSugestion = () => {
  const { user } = useConnectedUser();

  const { followSugestions, isError, isLoading } = useFollowSugestions(
    user?._id
  );

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
          return (
            <div className="mb-2">
              <FollowCard key={index} user={user} />
            </div>
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
