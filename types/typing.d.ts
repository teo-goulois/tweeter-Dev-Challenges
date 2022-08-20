import { ResUser } from "../libs/users/users";

export interface User {
  _id: string;
  following: string[];
  follower: string[];
  __v: number;
  id: string;
  email: string;
  name: string;
  image: string;
  provider: string;
  bio?: string;
  banner?: string;
}

export interface Tweet extends TweetBody {
  blockTweet: boolean;
  _id?: ObjectId;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type TweetBody = {
  text: string | undefined;
  image?: string | undefined;
  media: {
    isMedia: boolean;
    images: string[];
  };
  everyoneCanReply: boolean;
  author: User;
  likes: string[];
  comments: Comment[];
  retweets: string[];
  bookmarks: string[];
};

export interface Comment extends CommentBody {
  _id?: ObjectId;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isDeleted: boolean;
}

export type CommentBody = {
  tweet: { _id: ObjectId };
  text: string;
  image: string;
  author: undefined | ResUser;
  likes: string[];
  parent?: ObjectId;
};
