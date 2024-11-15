import { FaCheck } from "react-icons/fa";

export default function StepCheckbox({
  isStepCompleted,
}: {
  isStepCompleted: boolean;
}) {
  return (
    <div
      className={`flex justify-center items-center h-16 md:h-20 lg:h-24 aspect-square rounded-full ${
        isStepCompleted
          ? "bg-brandPry text-white"
          : "border-4 border-brandPry bg-white"
      }`}
    >
      {isStepCompleted && <FaCheck  className="text-3xl lg:text-5xl" />}
      {!isStepCompleted && (
        <div className="w-5 lg:w-7 aspect-square rounded-full bg-brandPry"></div>
      )}
    </div>
  );
}
