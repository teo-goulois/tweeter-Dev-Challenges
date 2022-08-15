import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Tweet } from "../types/typing";

type ContextProps = {
  tweets: Tweet[];
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
  activeTweet: Tweet | undefined;
  setActiveTweet: Dispatch<SetStateAction<Tweet | undefined>>;
};

const initialState = {
  tweets: [],
  setTweets: () => {},
  activeTweet: undefined,
  setActiveTweet: () => {},
};

export const TweetContext = createContext<ContextProps>(initialState);

type ProviderProps = {
  children: React.ReactNode;
};

export const TweetProvider = ({ children }: ProviderProps) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [activeTweet, setActiveTweet] = useState<Tweet | undefined>(undefined);

  /*  useEffect(() => {
    console.log(tweets, "TWEETS CONTEXT");
  }, [tweets]); */

  const value = { tweets, setTweets, activeTweet, setActiveTweet };
  return (
    <TweetContext.Provider value={value}>{children}</TweetContext.Provider>
  );
};
