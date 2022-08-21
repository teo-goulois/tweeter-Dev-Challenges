import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Trend = () => {
  // TODO: add trend
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] min-w-[306px] p-4 ">
      <h1 className="font-[Poppins] font-semibold text-xs">Trends for you</h1>
      {/* divider */}
      <div className="border border-gray3 my-2"></div>
      {/* divider */}
      <div className="flex flex-col items-start">
        {[
          ["#programming", "213"],
          ["#devchallenges", "123"],
          ["#frontend", "11"],
          ["#helsinki", "5"],
          ["#learntocode", "1"],
          ["#100DaysOfCode", "34"],
        ].map(([title, tweets]) => (
          <div key={title} className="cursor-pointer my-2">
            <Link href={title}>
              <a className={`font-semibold text-primary`}>{title}</a>
            </Link>
            <p className="font-medium text-xs text-secondary">{`${tweets}k Tweets`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trend;
