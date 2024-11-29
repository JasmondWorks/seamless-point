import Badge, { BadgeVariant } from "@/app/_components/Badge";
import Button, { ButtonVariant } from "@/app/_components/Button";
import Image from "next/image";
import React from "react";

export default function CarrierDetails({
  carrier,
  selectedCarrier,
  onSelectCarrier,
}) {
  const isSelected = selectedCarrier?.name === carrier.name;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(130px, 1fr))",
      }}
      className="shadow-md rounded-md p-5 w-fit gap-10 items-center bg-white"
    >
      <div className="flex gap-3">
        <Image
          src={carrier.logo}
          height={30}
          width={30}
          alt={carrier.name}
          className="w-10 object-contain"
        />
        <div className="flex flex-col">
          <span className="uppercase font-bold text-lg">{carrier.name}</span>
          <span className="text-sm">Express shipping</span>
        </div>
      </div>
      <div className="flex flex-col text-sm gap-y-2">
        <span>
          <strong>Pick up: </strong> Within 2 days
        </span>
        <span>
          <strong>Delivery: </strong> Within 4 days
        </span>
      </div>
      <div className="flex justify-center">
        <Badge
          className="w-fit"
          variant={BadgeVariant.neutralDark}
          text="Drop Off"
        />
      </div>
      <span className="text-3xl font-semibold">N{carrier.price}</span>
      <Button
        className={`${isSelected ? "!bg-[#fde9d7] !text-brandSec" : ""} `}
        isRoundedLarge
        variant={ButtonVariant.fill}
        text={isSelected ? "SELECTED" : "Select"}
        onClick={() => onSelectCarrier(carrier)}
      />
    </div>
  );
}
