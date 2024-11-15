import React from "react";
import DeliveryStatusItem from "./DeliveryStatusItem";

const stepsData = [
  {
    id: 1,
    title: "A driver has been assigned",
    desc: "Your request has been assigned to a driver and you will be called soon using the number you registered",
  },
  {
    id: 2,
    title: "Your package has been picked up",
    desc: "Your package has been picked up by the rider",
  },
  {
    id: 3,
    title: "Your package is in transit",
    desc: "Your package has been picked by the rider and is being delivered",
  },
  {
    id: 4,
    title: "Your package has been delivered",
    desc: "Your package has been delivered by the rider",
  },
];

export default function DeliveryStatuses() {
  return (
    <div className="flex gap-20 flex-col justify-between">
      {stepsData.map((step) => (
        <DeliveryStatusItem key={step.id} step={step} />
      ))}
    </div>
  );
}
