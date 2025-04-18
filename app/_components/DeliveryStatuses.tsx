import React from "react";
import DeliveryStatusItem from "./DeliveryStatusItem";
import CopyPhoneNumber from "@/app/_components/CopyPhoneNumber";

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

export default function DeliveryStatuses({
  direction = "responsive",
}: {
  direction: string;
}) {
  return (
    <div>
      <div
        className={`${
          direction === "responsive" ? "grid grid-rows-4" : "flex"
        }`}
      >
        {stepsData.map((step, index) => (
          <DeliveryStatusItem
            direction={direction}
            key={step.id}
            step={step}
            index={index}
          />
        ))}
      </div>
      <div className="space-y-1 flex flex-col items-start mt-8">
        <CopyPhoneNumber />
        <p className="text-sm font-medium">{"Rider's"} number</p>
      </div>
    </div>
  );
}
