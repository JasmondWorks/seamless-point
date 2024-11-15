import React from "react";

export default function SpinnerFull() {
  return (
    <div className="absolute h-screen w-screen grid place-items-center">
      <div className="loader !w-16 !h-16 border-4 !border-brandSec !border-b-transparent"></div>
    </div>
  );
}
