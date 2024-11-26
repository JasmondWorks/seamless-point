"use client";

import BalanceDisplay from "@/app/_components/BalanceDisplay";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import SelectDebitCard from "@/app/_components/SelectDebitCard";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { useFormContext } from "@/app/_contexts/FormContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function WithdrawalForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { formData, addFormData } = useFormContext();
  const [amount, setAmount] = useState("");
  console.log(formData);
  const router = useRouter();

  function handleSetAmount(e) {
    setAmount(e.target.value);
    addFormData({ amount: e.target.value });
  }

  function onSubmit() {
    if (!formData.selectedDebitCard || !formData.amount) {
      if (!formData.selectedDebitCard)
        toast.error("Select a debit card to proceed");
      if (!formData.amount) toast.error("Enter an amount to proceed");

      return;
    }

    setIsDialogOpen(true);
  }

  function handleConfirmSuccess() {
    router.push("/user/dashboard");
  }

  return (
    <div className="flex flex-col gap-y-10">
      <BalanceDisplay />
      <div className="flex flex-col gap-3">
        <label htmlFor="withdrawAmount">
          Enter the amount that you wish to withdraw
        </label>
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
      <SelectDebitCard />
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
