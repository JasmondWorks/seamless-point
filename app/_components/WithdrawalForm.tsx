"use client";

import BalanceDisplay from "@/app/_components/BalanceDisplay";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import Spinner from "@/app/_components/Spinner";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import WithdrawalAccountDetails from "@/app/_components/WithdrawalAccountDetails";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function WithdrawalForm({ onShowAddAccount }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function handleSetAmount(e: any) {
    setAmount(e.target.value);
  }

  function onSubmit() {
    // if (!selectedDebitCard || !amount) {
    if (!amount) {
      // if (!selectedDebitCard) toast.error("Select a debit card to proceed");
      if (!amount) toast.error("Enter an amount to proceed");

      return;
    }

    setIsDialogOpen(true);
  }

  function handleConfirmSuccess() {
    router.push("/user/dashboard");
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner color="orange" size="medium" />
      </div>
    );

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col sm:flex-row gap-5">
        <BalanceDisplay />
        <WithdrawalAccountDetails onShowAddAccount={onShowAddAccount} />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="withdrawAmount">
          Enter the amount that you wish to withdraw
        </Label>
        <Input
          value={amount}
          onChange={handleSetAmount}
          className="bg-white h-11"
          id="withdrawAmount"
          type="text"
          placeholder="20, 000"
        />
        <p className="text-sm text-muted">
          The amount will be withdrawn to the bank {"that's"} registered with
          this account
        </p>
      </div>
      {/* <SelectDebitCard /> */}
      <PrivacyPolicyBlock />
      <ButtonFormSubmit onClick={onSubmit} text="I UNDERSTAND" />

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <SuccessDialogContent
            onConfirmSuccess={handleConfirmSuccess}
            title="Withdrawal successful"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
