"use client";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PackageDetails from "@/app/_components/PackageDetails";
import {
  formatCurrency,
  getNewDeliveryData,
  getParcelTotalAmount,
  getStoreState,
} from "@/app/_lib/utils";
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import { useRouter } from "next/navigation";
import React from "react";

export default function PackageDetailsPage() {
  const router = useRouter();
  function onSubmit() {
    router.push("/user/deliveries/register/payment");
  }

  const sender = useCreateDeliveryStore((store) => store.sender);
  const receiver = useCreateDeliveryStore((store) => store.receiver);
  const parcel = useCreateDeliveryStore((store) => store.parcelDetails);

  return (
    <div className="space-y-8">
      <h1 className="headline text-center mb-10">Package details</h1>

      <PackageDetails sender={sender} receiver={receiver} parcel={parcel} />
      <ButtonFormSubmit onClick={onSubmit} text="I UNDERSTAND" />
    </div>
  );
}
