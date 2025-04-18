"use client";

import React, { useEffect } from "react";
import SpinnerFull from "./SpinnerFull";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_contexts/UserAuthContext";
import toast from "react-hot-toast";

export default function ProtectedRoutes({ children }: { children: any }) {
  const router = useRouter();
  const { user, isAuthenticating, logout } = useUserAuth();

  useEffect(() => {
    if (isAuthenticating) return; // Wait until authentication is complete

    if (!user) {
      // If no user is logged in, redirect to admin login
      toast.error("You need to log in to access this page.");
      router.push("/auth/admin/login");
    } else if (user && user.role !== "admin") {
      // If the user is not an admin, restrict access
      toast.error(
        "You do not have permission to handle this page as you're a regular user"
      );
      logout(); // Log the user out
      router.push("/auth/admin/login"); // Redirect to admin login
    }
  }, [user, isAuthenticating, logout, router]);

  // Show loading spinner if authentication is still in progress
  if (isAuthenticating || !user) return <SpinnerFull />;

  // Render the children if the user is authenticated and has admin role
  return children;
}
