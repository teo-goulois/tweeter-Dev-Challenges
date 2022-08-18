import { useSession } from "next-auth/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Tweet, User } from "../types/typing";
import useUser from "../utils/home/useUser";

type ContextProps = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

const initialState = {
  user: undefined,
  setUser: () => {},
};

export const AuthContext = createContext<ContextProps>(initialState);

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (session?.user) {
      setUser(session?.user);
    }
  }, [session]);
  /* useEffect(() => {
       
  }, [currentUser]); */
  
  const value = { user, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
