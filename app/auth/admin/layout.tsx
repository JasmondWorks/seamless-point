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
  const { authState, user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/admin/dashboard");
  }, [user]);

  if (authState === "loading") return <SpinnerFull />;

  return (
    !user && (
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="h-full flex-1 overflow-auto">{children}</main>
      </div>
    )
  );
}
