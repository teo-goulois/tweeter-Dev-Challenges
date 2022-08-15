import { useSession } from "next-auth/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Tweet, User } from "../types/typing";

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
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(session?.user)
  }, [session])

  const value = { user, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
