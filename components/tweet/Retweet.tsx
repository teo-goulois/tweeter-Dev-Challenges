import { useState, useEffect } from "react";
import { RetweetIcon } from "../../icons/Icons";

type Props = {
  retweets: string[];
  userFollowings: string[] | undefined;
};

const ShowRetweet = ({ retweets, userFollowings }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const fetchData = async () => {
    const temp = retweets.filter((item) => userFollowings?.includes(item))[0];
    if (temp) {
      setLoading(true);
      const res = await fetch(`/api/user/${temp}`);
      const data = await res.json();
      setName(data.name);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [retweets, userFollowings]);

  if (name) {
    return (
      <div className="flex items-center text-sm text-secondary my-2">
        <div className="h-4 mr-2 rotate rotate-2 ">
          <RetweetIcon />
        </div>
        <p> {loading ? "loading..." : name} Retweeted</p>
      </div>
    );
  } else {
    return null;
  }
};

export default ShowRetweet;
