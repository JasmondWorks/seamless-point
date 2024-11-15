"use client";

import SpinnerFull from "@/app/_components/SpinnerFull";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token, isAuthenticating, authenticated } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && token) router.push("/user/dashboard");
  }, [user, token]);

  if (isAuthenticating) return <SpinnerFull />;

  return authenticated === false && children;
}
