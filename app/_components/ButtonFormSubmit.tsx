import React from "react";
import Button, { ButtonVariant } from "./Button";
import clsx from "clsx";

interface Props {
  text?: string | React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: any;
  isReversed?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export default function ButtonFormSubmit({
  text = "I UNDERSTAND",
  className = "",
  onClick,
  icon,
  isReversed,
  disabled,
  isLoading,
  children,
}: Props) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      isLoading={isLoading}
      onClick={onClick}
      text={text}
      className={clsx(
        "py-10 !h-12 items-center font-normal w-full focus:outline-none focus:ring-1 focus:ring-brandSec focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300",
        disabled && "opacity-50 cursor-not-allowed ",
        className
      )}
      isRoundedLarge
      variant={ButtonVariant.fill}
      isReversed={isReversed}
      icon={!disabled && icon}
    >
      {!text && children}
    </Button>
  );
}
