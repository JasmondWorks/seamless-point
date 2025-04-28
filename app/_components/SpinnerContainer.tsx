import Spinner from "./Spinner";
import React from "react";
import clsx from "clsx";

export default function SpinnerContainer({
  className = "",
  minHeight = "min-h-[400px]",
  ...spinnerProps
}: {
  className?: string;
  minHeight?: string;
  size?: "small" | "medium" | "large";
  color?: "orange" | "text";
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center w-full",
        minHeight,
        className
      )}
    >
      <Spinner size="large" color="orange" {...spinnerProps} />
    </div>
  );
}
