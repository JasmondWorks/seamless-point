import { FaCheck } from "react-icons/fa";

export default function StepCheckbox({
  isStepCompleted,
  index,
  direction,
}: {
  isStepCompleted: boolean;
  index: number;
  direction: string;
}) {
  console.log(index);
  return (
    <div
      className={`flex justify-center items-center h-16 aspect-square relative rounded-full ${
        isStepCompleted
          ? "bg-brandPry text-white"
          : "border-4 border-brandPry bg-white"
      }`}
    >
      {isStepCompleted && <FaCheck className="text-3xl relative z-10" />}

      {index !== 3 && (
        <span
          className={`bg-brandPry opacity-20 absolute ${
            direction === "responsive"
              ? "w-1 h-[300px] right-[50%] translate-x-[50%] bottom-0 translate-y-[100%]"
              : "w-[500px] h-1"
          } `}
        ></span>
      )}
      {!isStepCompleted && (
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative">
          <div className="w-5 aspect-square rounded-full bg-brandPry"></div>
        </div>
      )}
    </div>
  );
}
