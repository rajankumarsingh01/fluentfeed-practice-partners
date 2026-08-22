/* eslint-disable react-refresh/only-export-components -- Provider + `useUser` hook
   are intentionally co-located; splitting into a separate file for fast-refresh
   purity isn't worth the extra indirection in a project this size. */
import { createContext, useContext, useState, type ReactNode } from "react";

interface UserContextType {
  userId: string | null;
  setUserId: (id: string) => void;
  clearUserId: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "fluentfeed_user_id";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Lazy initializer: reads the persisted session synchronously on first
  // render instead of via an effect, avoiding an extra render + flicker.
  const [userId, setUserIdState] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );

  const setUserId = (id: string) => {
    localStorage.setItem(STORAGE_KEY, id);
    setUserIdState(id);
  };

  const clearUserId = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUserIdState(null);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, clearUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};