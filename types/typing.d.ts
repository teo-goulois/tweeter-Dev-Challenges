import { ResUser } from "../libs/users/users";

export interface Tweet extends TweetBody {
  blockTweet: boolean;
  _id?: ObjectId;
  _createdAt?: string;
  _updatedAt?: string;
  __v?: number;
}

export type TweetBody = {
  text: string | undefined;
  image?: string | undefined;
  author: undefined | ResUser;
  likes: { type?: ObjectId | undefined; ref?: string; _id?: string }[];
  comments?: { type?: ObjectId | undefined; ref?: unknown }[];
  retweets: { type?: ObjectId | undefined; ref?: unknown }[];
  bookmarks: { type?: ObjectId | undefined; ref?: unknown }[];
};

export interface Comment extends CommentBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "comment";
}

export type CommentBody = {
  comment: string;
  username: string;
  profileImage: string;
  author: resUser;
  likes: string[];
  tweet: {
    _type: string;
    _ref: string;
  };
};
