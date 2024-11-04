import React from "react";

export default function BalanceDisplay() {
  return (
    <div
      style={{
        background:
        "white url('/assets/images/naira-illustration.png') no-repeat right center/ contain",
      }}
      className="relative px-8 py-20 card w-full"
    >
      <h3 className="text-2xl absolute font-bold top-8 left-8">BALANCE</h3>
      <p className="text-7xl lg:text-9xl font-semibold">0.00</p>
    </div>
  );
}
