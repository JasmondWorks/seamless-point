"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

type AuthType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  isAuthenticating: boolean;
  authenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(undefined);
    setToken(undefined);
    setAuthenticated(false);
  }
  function login(user: User, token: string) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    setUser(user);
    setToken(token);
    setAuthenticated(true);
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);
      const token = JSON.parse(storedToken);

      setUser(user);
      setToken(token);
      setIsAuthenticating(false);
      setAuthenticated(true);
    } else {
      setIsAuthenticating(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuthenticating,
        authenticated,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("You tried to use app context outside of the AppProvider");
  }

  return context;
}
