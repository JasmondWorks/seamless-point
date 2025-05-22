import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import Link from "next/link";
import Spinner from "@/app/_components/Spinner";

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
  disabled?: boolean;
  isLoading?: boolean;
  href?: string;
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
  isLoading,
  href,
  ...props
}: ButtonProps) {
  const classes = clsx(
    "flex items-center whitespace-nowrap justify-center gap-2 px-6 py-3 font-semibold leading-4 h-11 text-base disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-brandSec focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300", // Common classes
    {
      "py-10": isBig,
      "pointer-events-none": disabled,
      "bg-white text-brandSec":
        variant === ButtonVariant.fillWhite && !isPrimary,
      "bg-white text-brandPry":
        variant === ButtonVariant.fillWhite && isPrimary,
      "flex-row-reverse": isReversed,
      "rounded-lg": isRoundedLarge,
      "rounded-sm": !isRoundedLarge,
      "border-2 border-brandPry text-brandPry":
        variant === ButtonVariant.outline,
      "bg-brandSec text-white": variant === ButtonVariant.fill && !isPrimary,
      "!bg-brandPryDark text-white":
        variant === ButtonVariant.fill && isPrimaryDark,
      "bg-brandPry text-white": variant === ButtonVariant.fill && isPrimary,
      "text-brandSec": variant === ButtonVariant.link,
      "bg-neutral-200": variant === ButtonVariant.neutralLight,
      "bg-neutral-900 text-white": variant === ButtonVariant.neutralDark,
      "opacity-40 pointer-events-none": isLoading,
    },
    className // Additional external classes
  );

  if (href)
    return (
      <Link href={href} className={classes}>
        {isLoading && <Spinner color="text" size="small" />}
        {text || children}
      </Link>
    );
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {isLoading && <Spinner color="text" size="small" />}
      {icon && <span>{icon}</span>}

      {text && <span className="flex items-center">{text}</span>}
      {!text && children}
    </button>
  );
}
