import React from "react";

export default function Spinner({
  className = "",
  size = "small",
  color = "text",
}: {
  className?: string;
  size?: string;
  color?: string;
}) {
  const base = "loader border-b-transparent";
  const sizes = {
    small: "h-[22px] w-[22px] border-[2px]",
    large: "h-16 w-16 border-[3px]",
  };
  const colors = {
    text: "border-current",
    orange: "border-brandSec",
  };

  return <div className={`${base} ${colors[color]} ${sizes[size]}`}></div>;
}
