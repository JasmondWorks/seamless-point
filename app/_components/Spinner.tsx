import React from "react";

export default function Spinner({
  className = "",
  size = "medium",
  color = "orange",
}: {
  className?: string;
  size?: "small" | "medium" | "large";
  color?: "text" | "orange";
}) {
  const base = "loader border-b-transparent";
  const sizes: any = {
    small: "h-6 w-6 !border-[3px]",
    medium: "h-8 w-8 !border-[3px]",
    large: "h-12 w-12 !border-[3px]",
  };
  const colors: any = {
    text: "border-current",
    orange: "border-brandSec",
  };

  return (
    <div
      className={`${base} ${colors[color]} ${sizes[size]} ${className}`}
    ></div>
  );
}
