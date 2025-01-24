import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

export enum ButtonVariant {
  link = "LINK",
  outline = "OUTLINE",
  fill = "FILL",
  fillWhite = "FILL_WHITE",
  neutralLight = "NEUTRAL_LIGHT",
  neutralDark = "NEUTRAL_DARK",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: ReactNode;
  text?: string | ReactNode;
  className?: string;
  icon?: ReactNode;
  isReversed?: boolean;
  isRoundedLarge?: boolean;
  isPrimary?: boolean;
  isPrimaryDark?: boolean;
  isBig?: boolean;
}

export default function Button({
  isPrimary = false,
  type = "button", // Default to "button"
  onClick,
  variant = ButtonVariant.link,
  children,
  text = "",
  icon = null,
  isPrimaryDark,
  isReversed = false,
  isRoundedLarge = false,
  isBig = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(
        "flex items-center whitespace-nowrap justify-center gap-2 px-6 py-3 font-semibold leading-4 h-11 text-base disabled:cursor-not-allowed", // Common classes
        {
          "py-10": isBig,
          "bg-white text-brandSec":
            variant === ButtonVariant.fillWhite && !isPrimary,
          "bg-white text-brandPry":
            variant === ButtonVariant.fillWhite && isPrimary,
          "flex-row-reverse": isReversed,
          "rounded-lg": isRoundedLarge,
          "rounded-sm": !isRoundedLarge,
          "border-2 border-brandPry text-brandPry":
            variant === ButtonVariant.outline,
          "bg-brandSec text-white":
            variant === ButtonVariant.fill && !isPrimary,
          "!bg-brandPryDark text-white":
            variant === ButtonVariant.fill && isPrimaryDark,
          "bg-brandPry text-white": variant === ButtonVariant.fill && isPrimary,
          "text-brandSec": variant === ButtonVariant.link,
          "bg-neutral-200": variant === ButtonVariant.neutralLight,
          "bg-neutral-900 text-white": variant === ButtonVariant.neutralDark,
        },
        className // Additional external classes
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {text && <span className="flex items-center">{text}</span>}
      {!text && children}
    </button>
  );
}
