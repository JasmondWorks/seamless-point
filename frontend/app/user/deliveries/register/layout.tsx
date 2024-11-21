import { FormProvider } from "@/app/_contexts/FormContext";
import React from "react";

export default function DeliveryRegisterLayout({
  children,
}: {
  children: any;
}) {
  return <FormProvider>{children}</FormProvider>;
}
