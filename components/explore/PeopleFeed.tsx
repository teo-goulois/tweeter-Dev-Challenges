import React from "react";
// Components
import PeopleCard from "./PeopleCard";
// Type
import { User } from "../../types/typing";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {
  peoples: User[];
  input: string;
};

const PeopleFeed = ({ peoples, input }: Props) => {
  const { user } = useConnectedUser();
  return (
    <div className="h-full w-full ">
      {peoples?.length > 0 ? (
        peoples.map((people, index) => {
          if (user?._id === people._id) return;
          return <PeopleCard input={input} key={people._id} people={people} />;
        })
      ) : (
        <div className="bg-white py-2 rounded-lg shadow-sm">
          <p className="text-primary font-semibold text-center text-lg">
            no user found
          </p>
        </div>
      )}
    </div>
  );
};

export default PeopleFeed;
