"use client";

import React, { useEffect, useState } from "react";
import SpinnerFull from "./SpinnerFull";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_contexts/UserAuthContext";

export default function ProtectedRoutes({
  children,
  userType = "user",
}: {
  children: any;
  userType?: string;
}) {
  const router = useRouter();
  const { user, isAuthenticating } = useUserAuth();

  useEffect(() => {
    if (isAuthenticating) return;
    if (!user) {
      userType === "user"
        ? router.push("/auth/user/login")
        : router.push("/auth/admin/login");
    }
  }, [user, isAuthenticating]);

  if (isAuthenticating) return <SpinnerFull />;

  return user && children;
}
