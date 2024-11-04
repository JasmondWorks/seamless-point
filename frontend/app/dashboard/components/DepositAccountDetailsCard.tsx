import Button, { ButtonVariant } from "@/components/Button";
import React from "react";

export default function DepositAccountDetailsCard() {
  return (
    <div className="flex rounded-lg items-center p-5 bg-brandSec text-white justify-between">
      <div className="flex flex-col gap-8">
        <span className="text-xl font-bold">WEMA BANK</span>
        <span className="text-5xl font-bold">12345678901</span>
        <span className="text-xl font-bold">PAYSTACK TITAN</span>
      </div>
      <Button variant={ButtonVariant.fillWhite} text="COPY" />
    </div>
  );
}
