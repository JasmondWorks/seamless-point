import React from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
