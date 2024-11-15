import { FormProvider } from "@/app/_contexts/FormContext";
import React from "react";

export default function DeliveryRegisterLayout({ children }) {
  return <FormProvider>{children}</FormProvider>;
}
