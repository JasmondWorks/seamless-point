import { FormProvider } from "@/app/_contexts/FormContext";
import React, { ReactNode } from "react";

export default function DepositLayout({ children }: { children: ReactNode }) {
  return (
    <div className="md:max-w-4xl md:px-16">
      <FormProvider>{children}</FormProvider>
    </div>
  );
}
