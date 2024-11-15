import Button, { ButtonVariant } from "@/app/_components/Button";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { Input } from "@/app/_components/ui/input";
import Link from "next/link";
import React from "react";

export default function TrackingHome() {
  return (
    <div className="max-w-3xl text-center">
      <div className="flex flex-col gap-10">
        <h1 className="headline">Enter the tracking number for your package</h1>
        <div className="space-y-2">
          <label htmlFor="trackingNumber">Tracking Number</label>
          <Input type="text" className="w-full h-11" />
        </div>
        <Link href="/dashboard/tracking/123">
          <ButtonFormSubmit text="CONTINUE" />
        </Link>
      </div>
    </div>
  );
}
