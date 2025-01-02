"use client";

import React from "react";

import { usePathname } from "next/navigation";

export default function SpinnerFull() {
  const pathname = usePathname();

  const isUserPage = pathname.split("/")[1] === "user";

  console.log("spinning...");

  return (
    <div
      // className={`absolute ${
      //   isUserPage ? "h-full w-full" : "h-screen w-screen"
      // }  grid place-items-center`}
      className="absolute inset-0 grid place-items-center z-50 h-screen w-screen"
    >
      <div className="loader !w-16 !h-16 !border-[3px] !border-b-transparent"></div>
    </div>
  );
}
