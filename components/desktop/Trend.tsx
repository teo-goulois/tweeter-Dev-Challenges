import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTags from "../../utils/home/useTags";

const Trend = () => {
  const { tags, tagsIsError, tagsIsLoading } = useTags();
  console.log(tags, "client tags");

  // TODO: add trend
  if (tagsIsLoading) return <p>Loading</p>;
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] min-w-[306px] p-4 ">
      <h1 className="font-[Poppins] font-semibold text-xs">Trends for you</h1>
      {/* divider */}
      <div className="border border-gray3 my-2"></div>
      {/* divider */}
      <div className="flex flex-col items-start">
        {tags.map((tag) => (
          <div key={tag._id} className="cursor-pointer my-2">
            <Link href={`/explore?query=${encodeURIComponent(tag.tag)}`}>
              <a className={`font-semibold text-primary`}>{tag.tag}</a>
            </Link>
            <p className="font-medium text-xs text-secondary">{`${tag.tag_count} Tweets`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trend;
