import styles from "./CourierDetails.module.css";

import Badge, { BadgeVariant } from "@/app/_components/Badge";
import Button, { ButtonVariant } from "@/app/_components/Button";
import { cn, formatCurrency } from "@/app/_lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CourierDetails({
  courier,
  selectedCourier,
  onSelectCourier,
}: {
  courier: any;
  selectedCourier: any;
  onSelectCourier: any;
}) {
  console.log(courier);

  const isSelected = selectedCourier?.carrier_name === courier.carrier_name;
  const {
    amount,
    carrier_logo,
    carrier_name,
    carrier_rate_description,
    delivery_time,
    dropoff_available,
    pickup_time,
  } = courier;

  return (
    <div
      onClick={() => onSelectCourier(courier)}
      className={cn(
        "cursor-pointer shadow-md rounded-md p-5 gap-6 items-center bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 justify-between text-sm",
        isSelected && styles.selected
      )}
    >
      <div className="flex gap-5 md:col-span-1 justify-center sm:justify-start">
        <Image
          src={carrier_logo}
          height={30}
          width={30}
          alt={carrier_name}
          className="w-10 object-contain"
        />
        <div className="flex flex-col items-start gap-y-1 justify-center md:justify-start">
          <span className="font-semibold text-lg leading-tight">
            {carrier_name}
          </span>
          <span className="leading-tight">{carrier_rate_description}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-1 whitespace-nowrap md:col-span-1">
        <div>
          <span className="font-semibold">Pick up: </span> {pickup_time}
        </div>
        <div>
          <span className="font-semibold">Delivery: </span> {delivery_time}
        </div>
      </div>
      <div className="flex justify-center sm:col-span-2 md:col-span-1">
        <Badge
          className="text-xs !h-auto"
          variant={BadgeVariant.neutralDark}
          text={`${!dropoff_available ? "No" : ""} Drop Off`}
        />
      </div>
      <span className="text-2xl font-semibold text-center sm:col-span-2 md:col-span-3 xl:col-span-1">
        {formatCurrency(amount)}
      </span>
      <div className="flex justify-center items-center sm:col-span-2 md:col-span-3 xl:col-span-1">
        <Button
          className={`pointer-events-none text-sm !h-auto !p-3 ${
            !isSelected
              ? "!bg-[#fde9d7] !text-brandSec"
              : "text-white bg-[var(--clr-brand-sec)]"
          }`}
          isRoundedLarge
          variant={ButtonVariant.fill}
        >
          <span className="">{isSelected ? "SELECTED" : "SELECT"}</span>
          {/* <Check className="" strokeWidth={3} /> */}
        </Button>
      </div>
    </div>
  );
}
