"use client";

import Navbar from "@/app/_components/Navbar";
import SpinnerFull from "@/app/_components/SpinnerFull";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticating, user } = useUserAuth();
  const router = useRouter();

  // console.log(authenticated);

  useEffect(() => {
    if (user) router.push("/admin/dashboard");
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
