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
};

const initialState = {
  tweets: [],
  setTweets: () => {},
};

export const TweetContext = createContext<ContextProps>(initialState);

type ProviderProps = {
  children: React.ReactNode;
};

export const TweetProvider = ({ children }: ProviderProps) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [exploreTweets, setExploreTweets] = useState<Tweet[]>([]);

 /*  useEffect(() => {
    console.log(tweets, "TWEETS CONTEXT");
  }, [tweets]); */

  const value = { tweets, setTweets };
  return (
    <TweetContext.Provider value={value}>{children}</TweetContext.Provider>
  );
};
