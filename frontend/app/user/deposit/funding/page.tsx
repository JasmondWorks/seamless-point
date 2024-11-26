"use client";

import SelectDebitCardButton from "@/app/_components/SelectDebitCard";
import DepositAccountDetailsCard from "@/app/_components/DepositAccountDetailsCard";
import React, { useState } from "react";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import SelectPaymentMethod from "@/app/_components/SelectPaymentMethod";
import { useFormContext } from "@/app/_contexts/FormContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Funding() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { addFormData } = useFormContext();
  const router = useRouter();

  function handleSelectPaymentType(type) {
    setSelectedPaymentMethod(type);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("here");
    if (!selectedPaymentMethod)
      return toast.error("Please select a payment method");
    addFormData({ selectedPaymentMethod });
    router.push("/user/deposit/amount");
  }

  console.log(selectedPaymentMethod);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
      <h1 className="headline text-center">Funding of Account</h1>
      <p className="text-center text-muted">
        Please Transfer Money To The Account Below Or Choose The Other Option
      </p>
      <DepositAccountDetailsCard />
      <SelectPaymentMethod
        onSelect={handleSelectPaymentType}
        selectedPaymentMethod={selectedPaymentMethod}
      />

      <PrivacyPolicyBlock />
      <ButtonFormSubmit onClick={handleSubmit} text="I UNDERSTAND" />
    </form>
  );
}
