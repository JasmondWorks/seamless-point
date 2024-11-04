import React from "react";
// import StepsMarker from "../components/StepsMarker";
import DeliveryStatuses from "../components/DeliveryStatuses";

export default function DeliveryTracking() {
  return (
    <div className="max-w-3xl h-full">
      <div className="flex h-full gap-10">
        <DeliveryStatuses />
      </div>
    </div>
  );
}
