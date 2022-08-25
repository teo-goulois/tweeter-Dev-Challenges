import React, { } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TailSpin } from "react-loader-spinner";

// Components
import PeopleCard from "./PeopleCard";
// Type
import { User } from "../../types/typing";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";

type Props = {
  peoples: User[];
  input: string;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<any[] | undefined>;
  isEmpty: boolean;
  isReachingEnd: boolean | undefined;
};

const PeopleFeed = ({ peoples, input, setSize, isReachingEnd, isEmpty }: Props) => {
  const { user } = useConnectedUser();

  const handleFetch = () => {
    setSize((prev) => prev + 1);
  };

  return (
    <div className="h-full w-full ">
      <InfiniteScroll
        dataLength={peoples ? peoples.length : 0}
        next={handleFetch}
        hasMore={!isReachingEnd ?? false}
        loader={
          <div className="w-full flex justify-center">
            <TailSpin
              height="40"
              width="40"
              color="blue"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        }
        endMessage={
          !isEmpty && (
            <div className="w-full flex justify-center">
              <p className="text-secondary">no more peoples</p>
            </div>
          )
        }
      >
        {!isEmpty ? (
          peoples.map((people, index) => {
            if (user?._id === people._id) return;
            return (
              <PeopleCard input={input} key={people._id} people={people} />
            );
          })
        ) : (
          <div className="bg-white py-2 rounded-lg shadow-sm">
            <p className="text-primary font-semibold text-center text-lg">
              no user found
            </p>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default PeopleFeed;
