"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authenticateAdmin, authenticateUser } from "../_lib/actions";
import Cookies from "js-cookie";

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
  authState: "loading" | "authenticated" | "unauthenticated";
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

// const userKey = getLocalStorageKey("user");

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    Cookies.remove("token");
    setAuthState("unauthenticated");
  }

  function login(user: User | undefined = undefined, token: string) {
    user && localStorage.setItem("user", JSON.stringify(user));
    user && setUser(user);
    Cookies.set("token", token);
    setAuthState("authenticated");
  }

  // Fetch stored token on mount
  useEffect(() => {
    async function authenticationInit(
      token: string,
      userType: string = "user"
    ) {
      try {
        const res: AuthResponse =
          userType === "user"
            ? await authenticateUser(token)
            : await authenticateAdmin(token);

        const user: User = JSON.parse(localStorage.getItem("user") || "{}");

        if (res?.status === "success") {
          login(user, token);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Authentication error:", error);
        logout();
      }
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      const token: string = Cookies.get("token") || "";

      const userType = user.role === "user" ? "user" : "admin";
      authenticationInit(token, userType);
      setUser({ ...user, role: userType });
    } else {
      setAuthState("unauthenticated");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authState,
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
