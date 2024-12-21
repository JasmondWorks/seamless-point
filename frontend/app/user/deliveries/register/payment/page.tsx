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
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import { useDeliveriesStore } from "@/app/_stores/deliveriesStore";
import { DispatchEnum, EDeliveryStatus } from "@/app/_lib/types";
import {
  getNewDeliveryData,
  getParcelTotalAmount,
  uploadFile,
} from "@/app/_lib/utils";
import { createDelivery } from "@/app/_lib/actions";

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const store = useCreateDeliveryStore((store) => store);
  const addDelivery = useDeliveriesStore((store) => store.addDelivery);
  const [isLoading, setIsLoading] = useState(false);

  const state = getNewDeliveryData();
  console.log(state);

  const resetDeliveryData = useCreateDeliveryStore(
    (store) => store.resetDeliveryData
  );

  const router = useRouter();

  // TODO: upload packageImage and proofOfPurchase and get back urls

  let timeout: NodeJS.Timeout;
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submitting...");

    // upload files
    setIsLoading(true);
    const packageImageUrl = await uploadFile(
      state.parcelDetails.packageImage,
      "package_images"
    );
    const proofOfPurchaseUrl = await uploadFile(
      state.parcelDetails.proofOfPurchase,
      "package_proofs"
    );

    const newDelivery = {
      ...state,
      ...state.sender,
      ...state.receiver,
      ...state.parcelDetails,
    };
    delete newDelivery.sender;
    delete newDelivery.receiver;
    delete newDelivery.parcelDetails;
    newDelivery.packageImage = packageImageUrl;
    newDelivery.proofOfPurchase = proofOfPurchaseUrl;

    console.log(newDelivery);

    try {
      const res = await createDelivery(newDelivery);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setIsDialogOpen(true);
    setIsLoading(false);

    timeout = setTimeout(() => router.push("/user/deliveries/success"), 5000);
    return () => clearTimeout(timeout);
  }
  return (
    <>
      <h1 className="headline text-center">Payment</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-10">
        <BalanceDisplay />
        <div className="flex flex-col gap-3">
          <Label htmlFor="withdrawAmount">Amount to be paid</Label>
          <Input
            disabled={true}
            value={getParcelTotalAmount(state.parcelDetails)}
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
        <ButtonFormSubmit isLoading={isLoading} text="I UNDERSTAND" />
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <SuccessDialogContent
            title="Payment successful"
            description="Your delivery has been confirmed and your delivery process has started"
            onConfirmSuccess={() => {
              router.push("/user/deliveries/success");
              clearTimeout(timeout);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
