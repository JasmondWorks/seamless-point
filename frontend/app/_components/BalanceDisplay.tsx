import clsx from "clsx";
import React from "react";

export default function BalanceDisplay({ className = "" }) {
  return (
    <div
      style={{
        background:
          "white url('/assets/images/naira-illustration.png') no-repeat right center/ contain",
      }}
      className={clsx("text-neutral-700 relative p-5 card w-full", className)}
    >
      <h3 className="text-lg font-bold leading-none">BALANCE</h3>
      <p className="text-[4.5rem] leading-none py-[0.5em]">0.00</p>
    </div>
  );
}
