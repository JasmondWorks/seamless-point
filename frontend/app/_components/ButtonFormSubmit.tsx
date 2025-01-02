import React from "react";
import Button, { ButtonVariant } from "./Button";
import clsx from "clsx";
import Spinner from "./Spinner";

interface Props {
  text?: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: any;
  isReversed?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export default function ButtonFormSubmit({
  text = "I UNDERSTAND",
  className = "",
  onClick,
  icon,
  isReversed,
  isLoading,
  children,
}: Props) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      onClick={onClick}
      text={isLoading ? <Spinner /> : text}
      className={clsx("py-10 !h-14 items-center font-normal w-full", className)}
      isRoundedLarge
      variant={ButtonVariant.fill}
      isReversed={isReversed}
      icon={!isLoading && icon}
    >
      {!text && children}
    </Button>
  );
}
