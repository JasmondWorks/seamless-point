import React from "react";
import Image from "next/image";
import Navbar from "@/app/_components/Navbar";

export default function DashboardLayout({ children }: { children: any }) {
  return (
    <div
      // style={{ height: "calc(100vh - 4rem)" }}
      className="bg-neutral-50"
    >
      <Navbar />
      <main
        style={{
          minHeight: "calc(100vh - 70px)",
        }}
        className="p-5 md:p-6 lg:p-8 
        mx-auto 
        lg:ml-72 ml-16 overflow-auto md:pr-32"
      >
        <div className="relative z-10 space-y-10 h-full">{children}</div>
        <Image
          style={{
            height: "calc(100vh - 7rem)",
            bottom: "calc(50% - 2rem)",
          }}
          className="hidden md:block translate-y-[50%] w-auto object-contain right-8 fixed"
          src="/assets/images/seamlesspoint-watermark.png"
          alt="seamless point"
          width={500}
          height={500}
        />
      </main>
    </div>
  );
}
