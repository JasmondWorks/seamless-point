"use client";

import BalanceDisplay from "@/app/_components/BalanceDisplay";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";

import {
  base64ToFile,
  getNewDeliveryData,
  getParcelTotalAmount,
  uploadFile,
} from "@/app/_lib/utils";
import useCreateDelivery from "@/app/_hooks/deliveries/useCreateDelivery";

export default function Payment() {
  const [isLoading, setIsLoading] = useState(false);
  const { createDelivery, isCreating, isError } = useCreateDelivery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userId = useCreateDeliveryStore((state) => state.userId);
  console.log(userId);

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
    // console.log("submitting...");

    // UPLOADING OF PACKAGE IMAGE AND PROOF OF PURCHASE
    setIsLoading(true);

    const packageImageUrl = await uploadFile(
      base64ToFile(
        state.parcelDetails.packageImage.base64File,
        state.parcelDetails.packageImage.name
      ),
      "package_images",
      "Package"
    );

    const proofOfPurchaseUrl = await uploadFile(
      base64ToFile(
        state.parcelDetails.proofOfPurchase.base64File,
        state.parcelDetails.proofOfPurchase.name
      ),
      "package_proofs",
      "Package proof"
    );

    if (!packageImageUrl || !proofOfPurchaseUrl) {
      // toast.error("Failed to upload files");
      setIsLoading(false);
      return;
    }
    console.log(proofOfPurchaseUrl, packageImageUrl);

    // FORMATTING NEW DELIVERY DATA
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
      createDelivery(newDelivery);

      if (!isError) {
        resetDeliveryData();
        timeout = setTimeout(
          () => router.push("/user/deliveries/success"),
          5000
        );
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);

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
        <ButtonFormSubmit
          isLoading={isLoading || isCreating}
          text="I UNDERSTAND"
        />
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
