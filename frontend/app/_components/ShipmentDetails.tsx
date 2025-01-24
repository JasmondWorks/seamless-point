import Badge, { BadgeVariant } from "@/app/_components/Badge";
import { AlertCircle } from "lucide-react";
import React from "react";

export default function ShipmentDetails() {
  return (
    <>
      <div className="flex justify-between mb-10">
        <h1 className="headline text-center">Receiver’s information</h1>
        <div>
          <Badge
            className="!rounded-full !border-[10px] !border-[#fef3f2]"
            variant={BadgeVariant.red}
          >
            <AlertCircle color="red" />
            <span>Cancel shipment</span>
          </Badge>
        </div>
      </div>
    </>
  );
}
