"use client";

import Badge, { BadgeVariant } from "@/app/_components/Badge";
import Button, { ButtonVariant } from "@/app/_components/Button";
import CourierDetails from "@/app/_components/CourierDetails";
import CountdownTimer from "@/app/_components/CountdownTimer";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { dispatches } from "@/app/_lib/constants";
import { Dispatch } from "@/app/_lib/types";
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SelectCourierPage() {
  const couriers = dispatches;

  const courier = useCreateDeliveryStore((store) => store.courier);
  const [selectedCourier, setSelectedCourier] = useState<Dispatch | null>(
    couriers.find((c) => c.name.toLowerCase() === courier) || null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const onSelectCourier = useCreateDeliveryStore(
    (store) => store.onSelectCourier
  );
  console.log(selectedCourier);
  function handleSelectCourier(courier: Dispatch) {
    console.log(courier);

    setSelectedCourier((prev: Dispatch | null) =>
      prev?.name === courier.name ? null : courier
    );
    onSelectCourier(courier);
  }

  function onSubmit() {
    if (!selectedCourier) return toast.error("You haven't selected a courier");

    setIsDialogOpen(true);

    setTimeout(
      () => router.push("/user/deliveries/register/package-details"),
      5000
    );
  }
  return (
    <div className="max-w-5xl space-y-10">
      <h1 className="headline text-center mb-10">Select Courier</h1>
      <div className="overflow-x-auto space-y-5">
        {couriers.map((courier) => (
          <CourierDetails
            key={courier.name}
            courier={courier}
            selectedCourier={selectedCourier}
            onSelectCourier={handleSelectCourier}
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
          <div className="space-y-10">
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
              <div className="flex flex-col gap-1 items-end">
                <span className="text-sm font-semibold">
                  {selectedCourier?.name}
                </span>
                <Badge
                  className="w-fit"
                  variant={BadgeVariant.orange}
                  text="SELECTED"
                />
              </div>
            </div>

            <span className="absolute bottom-1 right-3">
              <CountdownTimer initialSeconds={5} />
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
