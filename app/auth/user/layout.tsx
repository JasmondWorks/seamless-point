"use client";

import Navbar from "@/app/_components/Navbar";
import SpinnerFull from "@/app/_components/SpinnerFull";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticating, user } = useUserAuth();
  const router = useRouter();

  // console.log(authenticated);

  useEffect(() => {
    if (user) router.push("/user/dashboard");
  }, [user]);

  if (isAuthenticating) return <SpinnerFull />;

  return (
    !user && (
      <div className="flex flex-col h-screen">
        <Navbar />
        <ScrollArea className="h-full flex-1">{children}</ScrollArea>
      </div>
    )
  );
}
