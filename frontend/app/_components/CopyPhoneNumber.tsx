"use client";

import Button, { ButtonVariant } from "@/app/_components/Button";
import { CopyIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CopyPhoneNumber({ text = "08123456789" }) {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${text} has been copied to clipboard`);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <Button
      onClick={copyText}
      className="px-3 gap-5"
      isRoundedLarge
      variant={ButtonVariant.neutralDark}
      icon={<CopyIcon className="text-2xl" />}
      text={text}
    />
  );
}
