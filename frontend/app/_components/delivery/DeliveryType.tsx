import DashboardLayout from "@/app/_components/DashboardLayout";
import SelectDeliveryType from "@/app/_components/SelectDeliveryType";
import React from "react";

export default function DeliveryType() {
  return (
    <DashboardLayout>
      <h1 className="headline text-center">What are you trying to deliver</h1>
      <SelectDeliveryType />
    </DashboardLayout>
  );
}
