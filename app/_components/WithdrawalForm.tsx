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

export default function WithdrawalForm({ onShowAddAccount, bankDetails }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const router = useRouter();

  function handleSetAmount(e: any) {
    setAmount(e.target.value);
  }

  function onSubmit() {
    if (!amount) {
      if (!amount) toast.error("Enter an amount to proceed");

      return;
    }

    setIsDialogOpen(true);
  }

  function handleConfirmSuccess() {
    router.push("/user/dashboard");
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <BalanceDisplay className="!min-w-0 !w-full" />
        <WithdrawalAccountDetails
          onShowAddAccount={onShowAddAccount}
          bankDetails={bankDetails}
        />
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
