// import Spinner from "@/app/_components/Spinner";
// import React from "react";

// export default function SpinnerFull() {
//   console.log("spinning...");

//   return (
//     <div className="absolute bg-white inset-0 grid place-items-center z-50 h-screen w-screen">
//       <Spinner size="large" color="orange" />
//     </div>
//   );
// }

import Spinner from "@/app/_components/Spinner";
import { cn } from "@/app/_lib/utils";
import React from "react";

export default function SpinnerFull({ className = "" }) {
  return (
    <div
      className={cn(
        "absolute inset-0 grid place-items-center z-50 h-full w-full",
        className
      )}
    >
      <Spinner size="medium" color="orange" />
    </div>
  );
}
