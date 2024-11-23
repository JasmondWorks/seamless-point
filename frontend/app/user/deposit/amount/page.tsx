"use client";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { Input } from "@/app/_components/ui/input";
import { useFormContext } from "@/app/_contexts/FormContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { addFormData, formData } = useFormContext();
  const [amount, setAmount] = useState("");
  const router = useRouter();

  console.log(formData);

  function handleSubmit(e) {
    e.preventDefault();

    if (!amount) return toast.error("Please enter an amount");
    if (isNaN(amount)) return toast.error("Amount must be a number");

    addFormData({ amount: Number(amount) });
    router.push("/user/deposit/summary");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
      <h1 className="headline text-center">
        How much are you adding to your Account?
      </h1>
      <div className="flex flex-col gap-3">
        <span>Amount</span>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="h-11 bg-white"
          type="text"
          placeholder="100NGN"
        />
      </div>
      <PrivacyPolicyBlock />
      <ButtonFormSubmit onClick={handleSubmit} text="I UNDERSTAND" />
    </form>
  );
}
