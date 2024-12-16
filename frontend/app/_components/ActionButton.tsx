import clsx from "clsx";
import React from "react";

export default function ActionButton({
  icon,
  text,
  size = "",
}: {
  icon: any;
  text: string;
  size?: string;
}) {
  return (
    <div className="p-5 rounded-xl items-center flex gap-6 bg-[#fef5ee]">
      <span
        className={clsx(
          "rounded-full bg-orange-200 p-4 h-full aspect-square grid place-items-center"
        )}
      >
        <span
          className={clsx("flex justify-center items-center aspect-square", {
            "w-8": size === "sm",
            "w-10 lg:w-12": size !== "sm",
          })}
        >
          {icon}
        </span>
      </span>
      <span className="text-[#772517]">{text || "Deposit"}</span>
    </div>
  );
}
