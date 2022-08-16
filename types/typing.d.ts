import { ResUser } from "../libs/users/users";

export interface User {
  _id: string;
  following: String[];
  follower: String[];
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
  likes: { type?: ObjectId | undefined; ref?: string; _id?: string }[];
  comments: Comment[];
  retweets: { type?: ObjectId | undefined; ref?: unknown; _id?: string }[];
  bookmarks: { type?: ObjectId | undefined; ref?: unknown; _id?: string }[];
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
  likes: { type?: ObjectId | undefined; ref?: string; _id?: string }[];
  parent?: ObjectId;
};
