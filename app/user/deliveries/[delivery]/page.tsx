import DeliveryStatuses from "@/app/_components/DeliveryStatuses";
import React from "react";
// export function generateStaticParams() {
//   // Temporary placeholder data
//   return [{ delivery: "example-id" }];
// }
export default function Delivery() {
  return (
    <div>
      <DeliveryStatuses />
    </div>
  );
}
