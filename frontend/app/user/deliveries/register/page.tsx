import SelectDeliveryType from "@/app/_components/SelectDeliveryType";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <>
      <h1 className="headline text-center">What are you trying to deliver</h1>
      <SelectDeliveryType />
    </>
  );
}
