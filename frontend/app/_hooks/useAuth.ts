"use client";

// hooks/useAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const useAuth = () => {
  const router = useRouter();
  const isLoggedIn = Cookies.get("user-session"); // Check for session cookie

  useEffect(() => {
    if (!isLoggedIn && router.pathname.startsWith("/dashboard")) {
      router.push("/login"); // Redirect to login page if not logged in
    }
  }, [isLoggedIn, router]);

  return isLoggedIn;
};

export default useAuth;
