"use client";

import React, { useEffect } from "react";
import SpinnerFull from "./SpinnerFull";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_contexts/UserAuthContext";
import toast from "react-hot-toast";

export default function ProtectedRoutes({ children }: { children: any }) {
  const router = useRouter();
  const { user, authState, logout } = useUserAuth();

  useEffect(() => {
    // Only handle redirects when authentication is complete
    if (authState === "loading") return;

    if (authState === "unauthenticated") {
      router.push("/auth/user/login");
      return;
    }

    if (user && user.role !== "user") {
      toast.error(
        "You do not have permission to access this page as you're not a user"
      );
      logout();
      router.push("/auth/user/login");
    }
  }, [user, authState, logout, router]);

  // Show loading spinner while authenticating
  if (authState === "loading" || authState === "unauthenticated") {
    return <SpinnerFull />;
  }

  // Show loading spinner while waiting for user data
  if (authState === "authenticated" && !user) {
    return <SpinnerFull />;
  }

  return children;
}
