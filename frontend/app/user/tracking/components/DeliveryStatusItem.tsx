import React from "react";
import CopyPhoneNumber from "@/app/_components/CopyPhoneNumber";
import StepCheckbox from "./StepCheckbox";

export default function DeliveryStatusItem({
  step,
  index,
}: {
  step: { id: number; title: string; desc: string };
  index: number;
}) {
  const currentStep = 1;
  const isStepCompleted = currentStep > step.id;

  return (
    <div className="flex gap-20 items-start overflow-y-hidden pb-10 lg:pb-16">
      <StepCheckbox isStepCompleted={isStepCompleted} index={index} />
      {currentStep >= step.id && (
        <div
          className={`space-y-5 ${
            isStepCompleted ? "pointer-events-none opacity-10" : ""
          }`}
        >
          <h3 className="text-2xl font-bold">{step?.title}</h3>
          <p>{step?.desc}</p>
          <div className="space-y-1">
            <CopyPhoneNumber />
            <p className="text-sm font-medium">{"Rider's"} number</p>
          </div>
        </div>
      )}
    </div>
  );
}
