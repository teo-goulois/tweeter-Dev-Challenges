import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TailSpin } from "react-loader-spinner";

// Components
import PeopleCard from "./PeopleCard";
// Type
import { User } from "../../types/typing";
// data relative
import useConnectedUser from "../../utils/users/useConnectedUser";
import { mutate } from "swr";

type Props = {
  peoples: User[];
  input: string;
  swrKey: string | (string | { method: string; body: string })[] | null;
  url: string;
};

const PeopleFeed = ({ peoples, input, swrKey, url }: Props) => {
  const { user } = useConnectedUser();
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const handleFetch = () => {
    mutate(
      swrKey,
      async (tempPeoples: User[]) => {
        const response = await fetch(`${url}page=${(page + 1) * 10}`, {
          method: "POST",
          body: JSON.stringify({
            _id: user?._id,
            following: user?.following,
          }),
        });
        const data = await response.json();
        if (data.length === 0) {
          setHasEnded(true);
        }
        const temp = [...tempPeoples, ...data];

        if (response.status === 200) {
          return temp;
        }
      },
      { revalidate: false }
    );
    setPage((prev) => prev + 1);
  };

  return (
    <div className="h-full w-full ">
      <InfiniteScroll
        dataLength={peoples.length}
        next={handleFetch}
        hasMore={peoples.length === 0 ? false : !hasEnded}
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
          peoples.length === 0 ? null : (
            <div className="w-full flex justify-center">
              <p className="text-secondary">no more peoples</p>
            </div>
          )
        }
      >
        {peoples?.length > 1 ? (
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
