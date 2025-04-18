"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authenticateAdmin, authenticateUser } from "../_lib/actions";
import Cookies from "js-cookie";

type Admin = {
  id: string;
  firstName: string;
  lastName: string;
};

type AuthType = {
  user: Admin | null;
  setUser: (user: Admin | null) => void;
  isAuthenticating: boolean;
  // authenticated: boolean;
  login: (user: Admin | null, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Admin | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  // const [authenticated, setAuthenticated] = useState(false);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    Cookies.remove("token");
    // setAuthenticated(false);
  }
  function login(user: Admin | null, token: string) {
    user && localStorage.setItem("user", JSON.stringify(user));
    user && setUser(user);
    Cookies.set("token", token);
    // setAuthenticated(true);
  }

  // Fetch stored token on mount
  useEffect(() => {
    async function authenticationInit(token: string) {
      try {
        await authenticateAdmin(token);
        // setAuthenticated(true);
        console.log("authenticated");
      } catch (error) {
        // setAuthenticated(false);
        console.log("not authenticated");
        logout();
      } finally {
        setIsAuthenticating(false);
      }
    }

    const storedAdmin = localStorage.getItem("user");

    if (storedAdmin) {
      const user = JSON.parse(storedAdmin);
      const token = Cookies.get("token");
      console.log(token);

      authenticationInit(token);

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

export function useAdminAuth() {
  const context = useContext(AuthContext);

  console.log(context);

  if (!context) {
    throw new Error(
      "You tried to use UserAuthContext outside of the UserAuthProvider"
    );
  }

  return context;
}
