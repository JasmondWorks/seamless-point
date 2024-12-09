"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authenticateAdmin, authenticateUser } from "../_lib/actions";
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

type AuthResponse = {
  status: string;
  message: string;
  user?: User;
  token?: string;
};

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
    user && localStorage.setItem("user", JSON.stringify(user));
    user && setUser(user);
    Cookies.set("token", token);
    // setAuthenticated(true);
  }

  // Fetch stored token on mount
  useEffect(() => {
    async function authenticationInit(
      token: string,
      userType: string = "user"
    ) {
      const res: AuthResponse = userType === "user" 
        ? await authenticateUser(token) 
        : await authenticateAdmin(token);

      if (res.status === "success" && res.user && res.token) {
        login(res.user, res.token);
      } else {
        logout();
      }
      setIsAuthenticating(false);
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const token = Cookies.get("token");
      console.log(token);
      const userType = user.role === "user" ? "user" : "admin";

      authenticationInit(token, userType);

      setUser(user);
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
