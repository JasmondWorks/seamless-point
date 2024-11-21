"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authenticateUser } from "../_lib/actions";
import Cookies from "js-cookie";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

type AuthType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticating: boolean;
  // authenticated: boolean;
  login: (user: User | null, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  // const [authenticated, setAuthenticated] = useState(false);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    Cookies.remove("token");
    // setAuthenticated(false);
  }
  function login(user: User | null, token: string) {
    const userFullDetails = { ...user, token };
    user && localStorage.setItem("user", JSON.stringify(userFullDetails));
    user && setUser(user);
    Cookies.set("token", token);
    // setAuthenticated(true);
  }

  // Fetch stored token on mount
  useEffect(() => {
    async function authenticationInit(token: string) {
      try {
        await authenticateUser(token);
        // setAuthenticated(true);
        console.log("authenticated");
      } catch (error) {
        // setAuthenticated(false);
        logout();
      } finally {
        setIsAuthenticating(false);
      }
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const token = user.token;

      authenticationInit(token);

      setUser(user);
      Cookies.set("token", token);
    } else {
      setIsAuthenticating(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticating,
        // authenticated,
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

  if (!context) {
    throw new Error(
      "You tried to use UserAuthContext outside of the UserAuthProvider"
    );
  }

  return context;
}
