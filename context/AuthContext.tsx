import { createContext, Dispatch, SetStateAction, useState } from "react";

type ContextProps = {
    test: string
    setTest: Dispatch<SetStateAction<string>>
};

const initialState = {
    test: 'test',
    setTest: () => {}
}

export const AuthContext = createContext<ContextProps>(initialState);

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: ProviderProps) => {
    const [test, setTest] = useState<string>('test')
  const value = {test, setTest};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
