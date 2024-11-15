import React from "react";
import DepositAccountDetailsCard from "@/app/_components/DepositAccountDetailsCard";
import { Checkbox } from "@radix-ui/react-checkbox";
import Button, { ButtonVariant } from "@/app/_components/Button";
import { Input } from "@/app/_components/ui/input";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import SelectDebitCardButton from "@/app/_components/SelectDebitCard";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";

export default function Deposit() {
  const step = 3;
  return (
    <div className="max-w-3xl">
      {step === 1 && <StepOne />}
      {step === 2 && <StepTwo />}
      {step === 3 && <StepThree />}
    </div>
  );
}

function StepOne() {
  return (
    <>
      <h1 className="headline text-center">Funding of Account</h1>
      <p className="text-center">
        Please Transfer Money To The Account Below Or Choose The Other Option
      </p>
      <DepositAccountDetailsCard />
      <SelectDebitCardButton />
      <PrivacyPolicyBlock />
      <ButtonFormSubmit text="I UNDERSTAND" />
    </>
  );
}

function StepTwo() {
  return (
    <>
      <h1 className="headline text-center">
        How much are you adding to your Account?
      </h1>
      <div className="flex flex-col gap-3">
        <span>Amount</span>
        <Input type="text" placeholder="100NGN" />
      </div>
      <PrivacyPolicyBlock />
      <ButtonFormSubmit text="I UNDERSTAND" />
    </>
  );
}
function StepThree() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="headline text-center">{"{100 NGN}"}</h1>
      <div>
        <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
          <span>Pay with card</span>
          <span>Debit card</span>
        </div>
        <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
          <span>Amount to add</span>
          <span>100.00</span>
        </div>
        <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
          <span>Transaction fee</span>
          <span>1.50</span>
        </div>
        <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
          <span>Amount to pay</span>
          <span className="font-bold">101.50</span>
        </div>
      </div>
      <PrivacyPolicyBlock />
      <ButtonFormSubmit text="I UNDERSTAND" />
    </div>
  );
}
