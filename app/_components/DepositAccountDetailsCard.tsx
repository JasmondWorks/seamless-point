"use client";

import Button, { ButtonVariant } from "@/app/_components/Button";
import { copyToClipboard } from "@/app/_utils/utils";
import React from "react";

export default function DepositAccountDetailsCard() {
  return (
    <div className="space-y-6 rounded-lg items-center p-5 bg-brandSec text-white">
      <p className="text-lg font-bold">WEMA BANK</p>
      <p className="text-4xl lg:text-5xl font-bold flex justify-between gap-x-10 gap-y-2 flex-wrap">
        <span>12345678901</span>
        <Button
          className="w-fit"
          variant={ButtonVariant.fillWhite}
          text="COPY"
          onClick={() => copyToClipboard("12345678901")}
        />
      </p>
      <p className="text-lg font-bold">PAYSTACK TITAN</p>
    </div>
  );
}
