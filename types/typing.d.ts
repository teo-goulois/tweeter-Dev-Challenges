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
  tweet: string;
  text: string;
  images: string[];
  author: undefined | ResUser;
  likes: string[];
  parent?: string;
};

export interface Tag {
  _id: string;
  tag: string;
  tag_count: number;
  tweets: string[];
}

export interface Conversation {
  _id?: string;
  name: string;
  desc: String;
  author: User;
  members: User[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Chat {
  _id?: string;
  text: string;
  images: string[];
  conversationID: string;
  author: User;
  createdAt?: string;
  updatedAt?: string;
  userID?: string;
  isLoading?: boolean;
}
