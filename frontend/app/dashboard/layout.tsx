import React from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const isLoggedIn = useAuth(); // Check if the user is logged in, redirect if not

  // if (!isLoggedIn) {
  //   return <div>Redirecting...</div>; // Show a loading spinner or message while checking login state
  // }

  return (
    <div
      // style={{ height: "calc(100vh - 4rem)" }}
      className="bg-neutral-50 mt-16"
    >
      <Navbar />
      <main
        style={{
          minHeight: "calc(100vh - 4rem)",
        }}
        className="p-5 md:p-6 lg:p-8 
        mx-auto 
        md:ml-72 ml-16 overflow-auto"
      >
        <div className="relative z-10 space-y-10 h-full">{children}</div>
        <Image
          style={{
            height: "calc(100vh - 8rem)",
            bottom: "calc(50% - 2rem)",
          }}
          className="hidden lg:block translate-y-[50%] w-auto object-contain right-8 fixed"
          src="/assets/images/seamlesspoint-watermark.png"
          alt="seamless point"
          width={500}
          height={500}
        />
      </main>
    </div>
  );
}
