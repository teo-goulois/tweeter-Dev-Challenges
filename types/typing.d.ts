export type User = {
  email: string;
  image?: string;
  name: string;
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "tweet";
};
export interface Tweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "tweet";
  blockTweet: boolean;
}

export type TweetBody = {
  text: string;
  userID: string;
  image?: string;
  user: User;
  likes: Reference[];
  comments: Reference[];
  retweets: Reference[];
  bookmarks: Reference[];
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
  user: User;
  likes: Reference[];
  tweet: {
    _type: string;
    _ref: string;
  };
};

export type Reference = {
  to: {
    _ref: string;
    _type: string;
  };
};
