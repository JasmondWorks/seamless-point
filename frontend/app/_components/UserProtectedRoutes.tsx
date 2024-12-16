"use client";

import React, { useEffect, useState } from "react";
import SpinnerFull from "./SpinnerFull";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_contexts/UserAuthContext";

export default function ProtectedRoutes({
  children,
}: {
  children: any;
  userType?: string;
}) {
  const router = useRouter();
  const { user, isAuthenticating, logout } = useUserAuth();

  useEffect(() => {
    if (isAuthenticating) return;
    if (!user || user.role !== "user") {
      logout();
      router.push("/auth/user/login");
    }
  }, [user, isAuthenticating]);

  if (isAuthenticating) return <SpinnerFull />;

  return user && children;
}
