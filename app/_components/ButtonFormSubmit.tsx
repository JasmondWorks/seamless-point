import React from "react";
import Button, { ButtonVariant } from "./Button";
import clsx from "clsx";
import Spinner from "./Spinner";

interface Props {
  text?: string | React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: any;
  isReversed?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function ButtonFormSubmit({
  text = "I UNDERSTAND",
  className = "",
  onClick,
  icon,
  isReversed,
  disabled,
  children,
}: Props) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      text={text}
      className={clsx(
        "py-10 !h-14 items-center font-normal w-full",
        disabled && "opacity-50 cursor-not-allowed",
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
