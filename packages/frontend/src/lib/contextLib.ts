import { createContext, useContext } from "react";

export interface User {
  email: string;
}
export interface AppContextType {
  isAuthenticated: boolean;
  userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AppContext = createContext<AppContextType>({
  isAuthenticated: false,
  userHasAuthenticated: useAppContext,
  user: null,
  setUser: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}
