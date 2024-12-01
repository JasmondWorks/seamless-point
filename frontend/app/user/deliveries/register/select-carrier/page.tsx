"use client";

import Badge, { BadgeVariant } from "@/app/_components/Badge";
import Button, { ButtonVariant } from "@/app/_components/Button";
import CarrierDetails from "@/app/_components/CarrierDetails";
import CountdownTimer from "@/app/_components/CountdownTimer";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { useDeliveryFormStore } from "@/app/_stores/createDeliveryFormStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SelectCarrierPage() {
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const onSelectCourier = useDeliveryFormStore(
    (store) => store.onSelectCourier
  );

  const carriers = [
    {
      name: "dhl",
      logo: "/assets/images/dhl.png",
      deliveryType: "Drop Off",
      price: 60_000,
    },
    {
      name: "aramex",
      logo: "/assets/images/aramex.png",
      deliveryType: "Drop Off",
      price: 60_000,
    },
    {
      name: "ups",
      logo: "/assets/images/ups.png",
      deliveryType: "Drop Off",
      price: 60_000,
    },
    {
      name: "anka",
      logo: "/assets/images/anka.png",
      deliveryType: "Saves money",
      price: 60_000,
    },
  ];

  function handleSelectCarrier(carrier) {
    setSelectedCarrier(selectedCarrier?.name === carrier.name ? null : carrier);
  }

  function onSubmit() {
    if (!selectedCarrier) return toast.error("You haven't selected a carrier");

    onSelectCourier(selectedCarrier);
    setIsDialogOpen(true);

    setTimeout(
      () => router.push("/user/deliveries/register/package-details"),
      5000
    );
  }
  return (
    <div className="max-w-5xl space-y-10">
      <h1 className="headline text-center mb-10">Select Carrier</h1>
      <div className="overflow-x-auto space-y-5">
        {carriers.map((carrier) => (
          <CarrierDetails
            key={carrier.name}
            carrier={carrier}
            selectedCarrier={selectedCarrier}
            onSelectCarrier={handleSelectCarrier}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          variant={ButtonVariant.fill}
          className="!bg-[#fde9d7] !text-brandSec"
          text="Previous"
          isRoundedLarge
        />
        <Button
          onClick={onSubmit}
          variant={ButtonVariant.fill}
          className="!text-white !bg-brandSec"
          text="Continue"
          isRoundedLarge
        />
      </div>

      <Dialog open={isDialogOpen}>
        <DialogContent>
          <div className="space-y-10 relative">
            <DialogTitle>
              <span className="text-2xl">Purchase Insurance</span>
            </DialogTitle>
            <div className="flex flex-col gap-8 sm:flex-row justify-between sm:items-center">
              <Image
                className="h-10 w-fit object-contain"
                src="/assets/images/logo.png"
                alt="logo"
                width={200}
                height={200}
              />
              <span className="text-4xl font-semibold">N6,000</span>
              <Badge
                className="w-fit"
                variant={BadgeVariant.orange}
                text="SELECTED"
              />
            </div>

            <span className="absolute bottom-1 right-1">
              <CountdownTimer initialSeconds={5} />
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
