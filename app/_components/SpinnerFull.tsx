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
import React from "react";

export default function SpinnerFull() {
  console.log("spinning...");

  return (
    <div className="absolute inset-0 grid place-items-center z-50 h-full w-full">
      <Spinner size="medium" color="orange" />
    </div>
  );
}
