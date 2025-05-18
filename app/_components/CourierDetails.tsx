import styles from "./CourierDetails.module.css";

import Badge, { BadgeVariant } from "@/app/_components/Badge";
import Button, { ButtonVariant } from "@/app/_components/Button";
import { cn, formatCurrency } from "@/app/_lib/utils";
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
  const isSelected = selectedCourier?.carrier_name === courier.carrier_name;
  const {
    amount,
    carrier_logo,
    carrier_name,
    carrier_rate_description,
    currency,
    delivery_time,
    dropoff_available,
    pickup_time,
  } = courier;

  return (
    <div
      style={{
        whiteSpace: "nowrap",
      }}
      onClick={() => onSelectCourier(courier)}
      className={cn(
        "cursor-pointer shadow-md rounded-md p-5 w-fit gap-10 items-center bg-white grid grid-cols-[250px,auto,150px,250px,auto]",
        isSelected && styles.selected
      )}
    >
      <div className="flex gap-5">
        <Image
          src={carrier_logo}
          height={30}
          width={30}
          alt={carrier_name}
          className="w-10 object-contain"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold text-lg">{carrier_name}</span>
          <span className="text-sm">{carrier_rate_description}</span>
        </div>
      </div>
      <div className="flex flex-col items-start text-sm gap-y-2">
        <span>
          <strong>Pick up: </strong> {pickup_time}
        </span>
        <span>
          <strong>Delivery: </strong> {delivery_time}
        </span>
      </div>
      <div className="flex justify-center">
        <Badge
          className="w-fit"
          variant={BadgeVariant.neutralDark}
          text={`${!dropoff_available ? "No" : ""} Drop Off`}
        />
      </div>
      <span className="text-3xl font-semibold">{formatCurrency(amount)}</span>
      <Button
        className={`${
          isSelected ? "!bg-[#fde9d7] !text-brandSec" : ""
        } pointer-events-none`}
        isRoundedLarge
        variant={ButtonVariant.fill}
        text={isSelected ? "SELECTED" : "Select"}
        // onClick={() => onSelectCourier(courier)}
      />
    </div>
  );
}
