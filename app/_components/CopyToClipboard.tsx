"use client";

import { copyToClipboard } from "@/app/_utils/utils";
import React from "react";
import { IoCopyOutline } from "react-icons/io5";

export default function CopyToClipboard({ text }: { text: string }) {
  return (
    <button onClick={() => copyToClipboard(text)}>
      <IoCopyOutline className="text-2xl" />
    </button>
  );
}
