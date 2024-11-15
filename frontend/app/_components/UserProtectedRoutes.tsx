"use client";

import React, { useEffect, useState } from "react";
import SpinnerFull from "./SpinnerFull";
import { useRouter } from "next/navigation";
import { UserAuthProvider, useUserAuth } from "../_contexts/UserAuthContext";

export default function ProtectedRoutes({ children }: { children: any }) {
  const router = useRouter();
  const { user, token, isAuthenticating, authenticated } = useUserAuth();

  console.log(user, token);

  useEffect(() => {
    console.log("here");
    if (isAuthenticating) return;
    if (!user || !token) {
      console.log("back");

      router.push("/auth/user/login");
    }
  }, [user, token, isAuthenticating]);

  if (isAuthenticating) return <SpinnerFull />;

  return authenticated && children;
}
