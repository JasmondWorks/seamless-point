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
    <div className="p-2 rounded-xl items-center flex gap-3 bg-[#fef5ee] border border-orange-200">
      <span
        className={clsx(
          "rounded-full bg-orange-200 p-2 h-full aspect-square grid place-items-center"
        )}
      >
        <span
          className={clsx("flex justify-center items-center aspect-square")}
        >
          {icon}
        </span>
      </span>
      <span className="text-[#772517]">{text || "Deposit"}</span>
    </div>
  );
}
