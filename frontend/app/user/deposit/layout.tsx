import DashboardLayout from "@/app/_components/DashboardLayout";
import { FormProvider } from "@/app/_contexts/FormContext";
import React, { ReactNode } from "react";

export default function DepositLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout>
      <FormProvider>{children}</FormProvider>
    </DashboardLayout>
  );
}
