import React from "react";
import CopyPhoneNumber from "@/app/_components/CopyPhoneNumber";
import StepCheckbox from "./StepCheckbox";

export default function DeliveryStatusItem({
  step,
}: {
  step: { id: number; title: string; desc: string };
}) {
  const currentStep = 4;
  const isStepCompleted = currentStep > step.id;

  return (
    <div className="flex gap-20 items-start">
      <StepCheckbox isStepCompleted={isStepCompleted} />
      {currentStep >= step.id && (
        <div
          className={`space-y-5 ${
            isStepCompleted ? "pointer-events-none opacity-10" : ""
          }`}
        >
          <h3 className="text-2xl font-bold">{step?.title}</h3>
          <p>{step?.desc}</p>
          <CopyPhoneNumber />
          <p>{"Rider's"} number</p>
        </div>
      )}
    </div>
  );
}
