"use client";

import React, { useEffect, useState } from "react";

import SelectPaymentMethod from "@/app/_components/SelectPaymentMethod";

import { calculatePaystackFee as calculateTransactionFee } from "@/app/_utils/paystack";

import DashboardLayout from "@/app/_components/DashboardLayout";

import EnterAmount from "@/app/_components/deposit/EnterAmount";
import Summary from "@/app/_components/deposit/Summary";
import SpinnerFull from "@/app/_components/SpinnerFull";

export default function DepositPage() {
  const [step, setStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [isInternational, setIsInternational] = useState(false);
  const transactionFee = calculateTransactionFee(
    Number(amount),
    isInternational
  );
  useEffect(() => {
    async function getInternationalStatus() {
      // check if user is international
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/location`
        );

        console.log(response);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getInternationalStatus();
  }, []);

  function incrementStep() {
    setStep((step) => step + 1);
  }

  if (loading) return <SpinnerFull />;

  return (
    <DashboardLayout>
      {step === 1 && (
        <SelectPaymentMethod
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          incrementStep={incrementStep}
        />
      )}
      {step === 2 && (
        <EnterAmount
          incrementStep={incrementStep}
          amount={amount}
          setAmount={setAmount}
        />
      )}
      {step === 3 && (
        <Summary
          amount={amount}
          selectedPaymentMethod={selectedPaymentMethod}
          transactionFee={transactionFee}
        />
      )}
    </DashboardLayout>
  );
}
