"use client";

import { handleCopyToClipboard } from "@/app/_utils/utils";
import React from "react";
import { IoCopyOutline } from "react-icons/io5";

export default function CopyToClipboard({ text }: { text: string }) {
  return (
    <button onClick={() => handleCopyToClipboard(text)}>
      <IoCopyOutline className="text-2xl" />
    </button>
  );
}
