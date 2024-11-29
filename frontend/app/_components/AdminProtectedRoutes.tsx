"use client";

import React, { useEffect, useState } from "react";
import SpinnerFull from "./SpinnerFull";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_contexts/UserAuthContext";

export default function ProtectedRoutes({ children }: { children: any }) {
  const router = useRouter();
  const { user, isAuthenticating } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticating) return;
    if (!user) {
      router.push("/auth/admin/login");
    }
  }, [user, isAuthenticating]);

  if (isAuthenticating) return <SpinnerFull />;

  return user && children;
}
