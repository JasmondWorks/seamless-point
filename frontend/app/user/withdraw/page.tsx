import React, { useState } from "react";
import { FormProvider } from "@/app/_contexts/FormContext";
import WithdrawalForm from "@/app/_components/WithdrawalForm";

export default function Withdraw() {
  return (
    <FormProvider>
      <div className="max-w-3xl">
        <div className="flex flex-col gap-10">
          <h1 className="headline text-center">Withdrawal of Funds</h1>
          <WithdrawalForm />
        </div>
      </div>
    </FormProvider>
  );
}
