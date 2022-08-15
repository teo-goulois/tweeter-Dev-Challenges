import React from "react";
// Icons
import { RetweetIcon } from "../../icons/Icons";

type Props = {
  username: string;
};

const Retweeted = ({ username }: Props) => {
  return (
    <div className="flex items-center text-sm text-secondary my-2">
      <div className="h-4 mr-2 rotate rotate-2 ">
        <RetweetIcon />
      </div>
      <p>{`${username} Retweeted`}</p>
    </div>
  );
};

export default Retweeted;
