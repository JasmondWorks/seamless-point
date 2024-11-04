import React from "react";
import Button, { ButtonVariant } from "./Button";
import clsx from "clsx";

export default function ButtonFormSubmit({ text, className = "", onClick }) {
  return (
    <Button
      onClick={onClick}
      text={text}
      className={clsx("py-10 h-12 font-normal w-full", className)}
      isRoundedLarge
      variant={ButtonVariant.fill}
    />
  );
}
