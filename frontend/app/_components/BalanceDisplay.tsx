import React from "react";

export default function BalanceDisplay() {
  return (
    <div
      style={{
        background:
          "white url('/assets/images/naira-illustration.png') no-repeat right center/ contain",
      }}
      className="text-neutral-700 relative px-4 lg:px-6 py-16 lg:py-20 card w-full"
    >
      <h3 className="text-xl lg:text-2xl absolute font-bold top-4 left-4 lg:top-6 lg:left-6">
        BALANCE
      </h3>
      <p className="text-7xl lg:text-8xl">0.00</p>
    </div>
  );
}
