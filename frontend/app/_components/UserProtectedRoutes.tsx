"use client";

import React, { useEffect } from "react";
import SpinnerFull from "./SpinnerFull";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_contexts/UserAuthContext";
import toast from "react-hot-toast";

export default function ProtectedRoutes({ children }: { children: any }) {
  const router = useRouter();
  const { user, isAuthenticating, logout } = useUserAuth();

  console.log(user);

  useEffect(() => {
    if (isAuthenticating) return; // Wait until authentication is complete

    if (!user) {
      // If no user is logged in, redirect to the login page
      router.push("/auth/user/login");
    } else if (user && user.role !== "user") {
      // If the logged-in user is not a 'user', restrict access
      console.log("*******");
      console.log("is admin");
      console.log("*******");
      toast.error(
        "You do not have permission to access this page as you're not a user"
      );
      logout(); // Log the user out
      router.push("/auth/user/login"); // Redirect to the login page
    }
  }, [user, isAuthenticating, logout, router]);

  if (isAuthenticating || !user) return <SpinnerFull />;

  return children;
}
