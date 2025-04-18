"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authenticateAdmin, authenticateUser } from "../_lib/actions";
import Cookies from "js-cookie";
import { getLocalStorageKey } from "@/app/_lib/utils";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  profileImage: string;
};

type AuthType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticating: boolean;
  // authenticated: boolean;
  login: (user: User | undefined, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

type AuthResponse = {
  status: string;
  message: string;
  user?: User;
  token?: string;
};

const userKey = getLocalStorageKey("user");

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
  function login(user: User | undefined = undefined, token: string) {
    user && localStorage.setItem(userKey, JSON.stringify(user));
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
      const res: AuthResponse =
        userType === "user"
          ? await authenticateUser(token)
          : await authenticateAdmin(token);

      console.log(res);

      const user: User = JSON.parse(localStorage.getItem(userKey) || "{}");

      if (res?.status === "success") {
        login(user, token);
      } else {
        logout();
      }
      setIsAuthenticating(false);
    }

    const storedUser = localStorage.getItem(userKey);

    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      const token: string = Cookies.get("token") || "";

      const userType = user.role === "user" ? "user" : "admin";

      authenticationInit(token, userType);

      setUser({ ...user, role: userType });
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
