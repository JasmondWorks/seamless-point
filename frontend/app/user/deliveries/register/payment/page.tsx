"use client";

import BalanceDisplay from "@/app/_components/BalanceDisplay";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/app/_contexts/FormContext";
import toast from "react-hot-toast";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";
import { useDeliveriesStore } from "@/app/_stores";
import { useDeliveryFormStore } from "@/app/_stores/createDeliveryFormStore";

export default function Payment() {
  const { formData, addFormData, setFormData } = useFormContext();
  const [amount, setAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const resetDeliveryData = useDeliveryFormStore(
    (store) => store.resetDeliveryData
  );

  console.log(formData);
  const router = useRouter();

  useEffect(() => {
    const { amount, ...rest } = formData;
    setFormData(rest);
  }, []);

  function handleSetAmount(e) {
    setAmount(e.target.value);
    addFormData({ amount: e.target.value });
  }

  function onSubmit() {
    console.log("submitting...");
    if (!formData.amount || isNaN(formData.amount)) {
      if (!formData.amount) toast.error("Enter an amount to proceed");
      if (formData.amount && isNaN(formData.amount))
        toast.error("Amount must be a number");

      return;
    }

    setIsDialogOpen(true);

    resetDeliveryData();
    setTimeout(() => router.push("/user/deliveries/success"), 5000);
  }
  return (
    <>
      <h1 className="headline text-center">Payment</h1>
      <div className="flex flex-col gap-y-10">
        <BalanceDisplay />
        <div className="flex flex-col gap-3">
          <Label htmlFor="withdrawAmount">Amount to be paid</Label>
          <Input
            value={amount}
            onChange={handleSetAmount}
            className="bg-white h-11"
            id="withdrawAmount"
            type="text"
            placeholder="20, 000"
          />
          <p className="text-sm text-muted">
            This amount will be deducted from your balance
          </p>
        </div>

        <PrivacyPolicyBlock />
        <ButtonFormSubmit onClick={onSubmit} text="I UNDERSTAND" />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <SuccessDialogContent
            title="Payment successful"
            description="Your delivery has been confirmed and your delivery process has started"
            onConfirmSuccess={() => router.push("/user/deliveries/success")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
