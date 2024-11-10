"use client";

// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Tracks logged-in user
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage, cookies, etc.)
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    redirect("/login"); // Redirect to login page if logged out
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
