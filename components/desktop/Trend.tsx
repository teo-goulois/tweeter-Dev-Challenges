import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTags from "../../utils/home/useTags";

const Trend = () => {
  const { tags, tagsIsError, tagsIsLoading } = useTags();

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] min-w-[306px] p-4 ">
      <h1 className="font-[Poppins] font-semibold text-xs">Trends for you</h1>
      {/* divider */}
      <div className="border border-gray3 my-2"></div>
      {/* divider */}
      <div className="flex flex-col items-start">
     
        {tagsIsLoading ? (
          <p>Loading</p>
        ) : tagsIsError ? (
          <p>Error</p>
        ) : tags && tags.length > 0 ? (
          tags.map((tag) => (
            <div key={tag._id} className="cursor-pointer my-2">
              <Link href={`/explore?query=${encodeURIComponent(tag.tag)}`}>
                <a className={`font-semibold text-primary`}>{tag.tag}</a>
              </Link>
              <p className="font-medium text-xs text-secondary">{`${tag.tag_count} Tweets`}</p>
            </div>
          ))
        ) : (
          <p className="text-sm font-medium text-primary">no trends for now </p>
        )}
      </div>
    </div>
  );
};

export default Trend;
