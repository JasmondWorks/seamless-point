import React from "react";
import StepCheckbox from "./StepCheckbox";

export default function DeliveryStatusItem({
  step,
  index,
  direction,
}: {
  step: { id: number; title: string; desc: string };
  index: number;
  direction: string;
}) {
  const currentStep = 2;
  const isStepCompleted = currentStep > step.id;

  return (
    <div
      className={`flex text-left ${
        direction === "horizontal"
          ? `flex-col items-start gap-3 min-w-64 overflow-x-hidden ${
              index !== 3 ? "pr-14 lg:pr-20" : ""
            }`
          : `overflow-y-hidden items-start gap-20 ${
              index !== 3 ? "pb-14 lg:pb-20" : ""
            }`
      }`}
    >
      <StepCheckbox
        direction={direction}
        isStepCompleted={isStepCompleted}
        index={index}
      />
      {currentStep >= step.id && (
        <div
          className={`space-y-5 ${
            isStepCompleted ? "pointer-events-none opacity-10" : ""
          }`}
        >
          <h3 className="text-2xl font-bold">{step?.title}</h3>
          <p>{step?.desc}</p>
        </div>
      )}
    </div>
  );
}
