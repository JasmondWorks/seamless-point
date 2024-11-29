"use client";

import Navbar from "@/app/_components/Navbar";
import SpinnerFull from "@/app/_components/SpinnerFull";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticating, user } = useAdminAuth();
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
        <ScrollArea className="flex-1 h-full mt-20 md:mt-0">
          {children}
        </ScrollArea>
      </div>
    )
  );
}
