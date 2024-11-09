import React from "react";
import Button, { ButtonVariant } from "./Button";
import clsx from "clsx";

interface Props {
  text: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: any;
  isReversed: boolean;
}

export default function ButtonFormSubmit({
  text,
  className = "",
  onClick,
  icon,
  isReversed,
}: Props) {
  console.log("clicked");
  return (
    <Button
      onClick={onClick}
      text={text}
      className={clsx("py-10 h-12 font-normal w-full", className)}
      isRoundedLarge
      variant={ButtonVariant.fill}
      isReversed={isReversed}
      icon={icon}
    />
  );
}
