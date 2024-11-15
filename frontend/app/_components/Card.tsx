import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "rounded-lg p-4 border border-neutral-200 bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}
