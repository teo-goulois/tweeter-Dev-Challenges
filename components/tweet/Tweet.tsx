import moment from "moment";
import React, { useEffect, useState } from "react";
import { RetweetIcon } from "../../icons/Icons";
import { Comment as CommentType, Tweet } from "../../types/typing";
import { fetchComments } from "../../utils/fetchComments";
import Comment from "./Comment";
import Reply from "./Reply";
import TweetInfos from "./TweetInfos";

type Props = {
  tweet: Tweet;
};

const Tweet = ({ tweet }: Props) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const getComments = async () => {
      const comments = await fetchComments(tweet._id);
      setComments(comments);
    };
    getComments();
  }, [tweet]);

  return (
    <>
      {/* Retweet */}
      {/*  <div className="flex items-center text-sm text-secondary my-2">
        <div className="h-4 mr-2 rotate rotate-2 ">
          <RetweetIcon />
        </div>
        <p> Daniel Jensen Retweeted</p>
      </div> */}

      <div className="w-full bg-white p-4 rounded-lg shadow-[0_2px_4px_rgba(0, 0, 0, 0.05)] my-4 min-w-[70%] ">
        {/* author */}
        <div className="flex items-center">
          {/* image */}
          <div className="w-10 h-10 bg-gray rounded-lg mr-2">
            <img src={tweet.author?.image} alt="" />
          </div>
          {/* username and date */}
          <div>
            <h3 className="font-[Poppins] text-black font-medium ">
              {tweet.author?.name}
            </h3>
            <p className="font-medium text-xs text-gray4">
              {moment(tweet._createdAt).format("DD MMMM [at] h:mm")}
            </p>
          </div>
        </div>
        {/* text */}
        <div className="my-2">
          <p className="text-gray">{tweet.text}</p>
          {/* image */}
          {/* {
            (tweet.image && tweet.image?.length > 0) && 
           ( <div className="bg-red w-44 h-44">
              image
              <img className="w-full h-[50px] " src={tweet.image} alt="" />
            </div>)
          } */}
        </div>
        {/* tweet infos */}
        <TweetInfos tweet={tweet} comments={comments.length} />
        {/* reply */}
        <Reply tweetID={tweet._id} setComments={setComments} />
        {/* comments */}
        <div className="border border-gray3 w-full mb-2"></div>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment} comments={comments} setComments={setComments} />
          ))}
      </div>
    </>
  );
};

export default Tweet;
