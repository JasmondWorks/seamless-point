import { FaCheck } from "react-icons/fa";

export default function StepCheckbox({
  isStepCompleted,
  index,
}: {
  isStepCompleted: boolean;
  index: number;
}) {
  console.log(index);
  return (
    <div
      className={`flex justify-center items-center h-16 md:h-20 lg:h-24 aspect-square relative rounded-full bg-white ${
        isStepCompleted
          ? "bg-brandPry text-white"
          : "border-4 border-brandPry bg-white"
      }`}
    >
      {isStepCompleted && <FaCheck className="text-3xl lg:text-5xl" />}
      {!isStepCompleted && (
        <div className="w-5 lg:w-7 aspect-square rounded-full bg-brandPry"></div>
      )}
      {index !== 3 && (
        <span className="bg-brandPry opacity-20 absolute right-[50%] translate-x-[50%] bottom-0 translate-y-[100%] w-1 h-[300px]"></span>
      )}
    </div>
  );
}
