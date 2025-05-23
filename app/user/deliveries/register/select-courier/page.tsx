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
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getRates } from "@/app/_lib/actions";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import { showToast } from "@/app/_lib/toast";

export default function SelectCourierPage() {
  // const couriers = dispatches;
  const [couriers, setCouriers] = useState([]);
  const courier = useCreateDeliveryStore((store) => store.courier);
  const { receiver, sender, parcelDetails } = useCreateDeliveryStore(
    (store) => store
  );
  const [selectedCourier, setSelectedCourier] = useState<any>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const onSelectCourier = useCreateDeliveryStore(
    (store) => store.onSelectCourier
  );
  const [isLoading, setIsLoading] = useState(false);

  async function fetchRates() {
    console.log(sender?.country, sender?.state, sender?.city);
    console.log(receiver?.toCountry, receiver?.toState, receiver?.toCity);

    const pickupAddress = {
      country: sender?.country,
      state: sender?.state,
      city: sender?.city,
    };
    const deliveryAddress = {
      country: receiver!.toCountry,
      state: receiver!.toState,
      city: receiver!.toCity,
    };
    const packagingDetails = {
      height: 50,
      length: 70,
      name: parcelDetails?.packagingType,
      size_unit: "cm",
      type: parcelDetails?.packagingType,
      width: 50,
      weight: 0.25,
      weight_unit: "kg",
    };
    const parcel = {
      description: parcelDetails!.parcelItems
        .map((parcel) => parcel.description)
        .join(", "),
      items: parcelDetails!.parcelItems.map((item) => ({
        description: item.description,
        name: item.name,
        weight: item.weight,
        currency: parcelDetails!.currency,
        quantity: item.quantity,
        value: 2000,
      })),
      weight_unit: "kg",
    };
    const currency = parcelDetails!.currency;

    setIsLoading(true);
    const res = await getRates({
      pickupAddress,
      deliveryAddress,
      packagingDetails,
      parcel,
      currency,
    });
    setIsLoading(false);

    console.log(res.data);
    setCouriers(res.data);
  }
  useEffect(() => {
    fetchRates();

    showToast("Amount may change from time to time", "info");
  }, []);
  useEffect(() => {
    const foundCourier = couriers.find(
      (c: any) =>
        c.carrier_name === courier.carrier_name &&
        c.carrier_rate_description === courier.carrier_rate_description
    );
    setSelectedCourier(foundCourier);
  }, [couriers]);

  console.log(selectedCourier);
  // console.log("All data", receiver, sender, parcelDetails);
  // console.log(courier, selectedCourier);

  function handleSelectCourier(courier: any) {
    console.log(courier);

    setSelectedCourier((prev: any) =>
      prev?.carrier_name === courier.carrier_name &&
      prev?.carrier_rate_description === courier.carrier_rate_description
        ? null
        : courier
    );
  }

  function onSubmit() {
    if (!selectedCourier) return toast.error("You haven't selected a courier");

    onSelectCourier(selectedCourier);

    setIsDialogOpen(true);

    setTimeout(
      () => router.push("/user/deliveries/register/package-details"),
      5000
    );
  }

  return (
    <div className="max-w-5xl space-y-10">
      <h1 className="headline text-center mb-10">
        Select Courier
        {/* <button onClick={fetchRates} className="text-base border p-2">
          Click me
        </button> */}
      </h1>

      <div className="overflow-x-auto space-y-5">
        {isLoading && <DataFetchSpinner />}
        {!isLoading &&
          couriers.length === 0 &&
          "No rates available at this time"}
        {!isLoading &&
          couriers.length > 0 &&
          couriers?.map((courier: any) => (
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
