import Button, { ButtonVariant } from "@/components/Button";
import { CopyIcon } from "@radix-ui/react-icons";
import React from "react";

export default function CopyPhoneNumber() {
  return (
    <Button
    className="px-3 gap-5"
    isRoundedLarge
      variant={ButtonVariant.neutralDark}
      icon={<CopyIcon className="text-2xl" />}
      text="08123456789"
    />
  );
}
