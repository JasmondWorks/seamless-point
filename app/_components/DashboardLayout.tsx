import React from "react";

export default function DashboardLayout({
  children,
  isContained = true,
  isRightContained = false,
}: {
  children: React.ReactNode;
  isContained?: boolean;
  isRightContained?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-y-8 ${
        isContained ? "md:max-w-5xl md:px-16" : ""
      } ${isRightContained ? "lg:pr-20" : ""}`}
    >
      {children}
    </div>
  );
}
