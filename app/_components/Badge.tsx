import clsx from "clsx";
import React from "react";

export enum BadgeVariant {
  blue = "BLUE",
  orange = "ORANGE",
  neutralDark = "NEUTRAL_DARK",
  red = "RED",
  green = "GREEN",
}

interface Props {
  className?: string;
  text?: string;
  variant: BadgeVariant | null;
  children?: React.ReactNode;
  isRoundedFull?: boolean;
}
export default function Badge({
  className,
  variant,
  text,
  children,
  isRoundedFull = false,
}: Props) {
  return (
    <span
      className={clsx(
        "inline-flex gap-2 p-2 rounded-lg leading-none whitespace-nowrap text-sm font-semibold",
        {
          "bg-cyan-100 bg-opacity-80 text-brandPry":
            variant === BadgeVariant.blue,
          "bg-orange-100 bg-opacity-80 text-brandSec":
            variant === BadgeVariant.orange,
          "bg-neutral-200 text-neutral-400":
            variant === BadgeVariant.neutralDark,
          "bg-red-100 bg-opacity-80 text-red-500": variant === BadgeVariant.red,
          "bg-green-100 bg-opacity-80 text-green-500":
            variant === BadgeVariant.green,
          "!rounded-full": isRoundedFull,
        },
        className
      )}
    >
      {text || children}
    </span>
  );
}
