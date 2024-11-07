import React, { createContext, useContext } from "react";
const defaultValues = {
  user: {
    role: "user",
  },
};
const AppContext = createContext(defaultValues);
export function AppProvider({ children }: { children: React.ReactNode }) {
  const user = {
    role: "user",
  };
  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error("You tried to use app context outside app provider");

  return context;
}
