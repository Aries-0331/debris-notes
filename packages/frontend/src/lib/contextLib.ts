import { createContext, useContext } from "react";

export interface User {
  email: string;
  isAuthenticated: boolean;
}

export interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}
