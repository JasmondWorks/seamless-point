"use client";

import React from "react";
import { useUserAuth } from "../_contexts/UserAuthContext";

export default function SignOutButton({
  isNavShowing,
}: {
  isNavShowing: boolean;
}) {
  const { logout } = useUserAuth();

  return (
    <button
      onClick={logout}
      className={`w-full lg:items-center font-medium lg:px-10 py-4 lg:py-3 flex gap-3 ${
        !isNavShowing
          ? "justify-center lg:justify-start"
          : "lg:justify-start px-8"
      } hover:bg-neutral-200`}
    >
      <span className="w-7 h-7 lg:w-5 lg:h-5">
        <svg
          className="w-full h-full"
          width={16}
          height={14}
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.75 10L14.75 7M14.75 7L11.75 4M14.75 7L4.25 7M8.75 10V10.75C8.75 11.9926 7.74264 13 6.5 13H3.5C2.25736 13 1.25 11.9926 1.25 10.75V3.25C1.25 2.00736 2.25736 1 3.5 1H6.5C7.74264 1 8.75 2.00736 8.75 3.25V4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={`${isNavShowing ? "block" : "hidden lg:block"}`}>
        Logout
      </span>
    </button>
  );
}
