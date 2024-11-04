import BalanceDisplay from "@/app/dashboard/components/BalanceDisplay";
import PrivacyPolicyBlock from "@/app/dashboard/components/PrivacyPolicyBlock";
import ButtonFormSubmit from "@/components/ButtonFormSubmit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function Payment() {
  return (
    <>
      <h1 className="headline text-center">Payment</h1>
      <BalanceDisplay />
      <div>
        <Label htmlFor="amount">Amount to be paid</Label>
        <Input placeholder="50, 000" />
        <span>This amount will be deducted from your balance</span>
      </div>
      <PrivacyPolicyBlock />
      <ButtonFormSubmit text="I UNDERSTAND" />
    </>
  );
}
