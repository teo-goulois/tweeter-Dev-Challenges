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
  comments?: { type?: ObjectId | undefined; ref?: unknown; _id?: string }[];
  retweets: { type?: ObjectId | undefined; ref?: unknown; _id?: string }[];
  bookmarks: { type?: ObjectId | undefined; ref?: unknown; _id?: string }[];
};

export interface Comment extends CommentBody {
  _id?: ObjectId;
  _createdAt?: string;
  _updatedAt?: string;
  __v?: number;
  isDeleted: boolean;
}

export type CommentBody = {
  tweet: { _id: ObjectId };
  text: string;
  image: string;
  author: undefined | ResUser;
  likes:  { type?: ObjectId | undefined; ref?: string; _id?: string }[];
  parent?: ObjectId;
};
