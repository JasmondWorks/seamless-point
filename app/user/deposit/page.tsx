"use client";

import styles from "./page.module.css";

import { Input } from "@/app/_components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import SelectPaymentMethod from "@/app/_components/SelectPaymentMethod";

import { calculatePaystackFee as calculateTransactionFee } from "@/app/_utils/paystack";

import toast from "react-hot-toast";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "@/app/_components/ui/dialog";
import { Dialog } from "@/app/_components/ui/dialog";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";
import { CreditCardForm } from "@/app/_components/CreditCardForm";
import { IoIosClose } from "react-icons/io";
import { copyToClipboard } from "@/app/_utils/utils";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

import DashboardLayout from "@/app/_components/DashboardLayout";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";
import { set } from "mongoose";
import EnterAmount from "@/app/_components/deposit/EnterAmount";
import Summary from "@/app/_components/deposit/Summary";
import SpinnerFull from "@/app/_components/SpinnerFull";

enum EDialogContent {
  cardDetails = "CARD_DETAILS",
  bankValidation = "BANK_VALIDATION",
  accountDetails = "ACCOUNT_DETAILS",
  verify = "VERIFY",
  success = "SUCCESS",
}

interface User {
  email: string;
  [key: string]: any;
}

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

  console.log(isInternational);

  useEffect(() => {
    async function getInternationalStatus() {
      // check if user is international
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/location`
        );

        console.log(response);

        setIsInternational(response.isInternational);

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

function CardDetailsDialogContent({
  onOpenBankValidationDialog,
  amount,
}: {
  onOpenBankValidationDialog: () => void;
  amount: string;
}) {
  return (
    <div className={`flex flex-col gap-y-8`}>
      <TotalPriceHeader totalAmount={amount} />
      <div className="space-y-8">
        <h3 className="text-2xl font-bold">Enter your card details to pay</h3>
        <CreditCardForm onSubmit={onOpenBankValidationDialog} />
      </div>
    </div>
  );
}
function BankValidationContent({
  onOpenSuccessDialog,
}: {
  onOpenSuccessDialog: () => void;
}) {
  return (
    <div className={`flex flex-col gap-y-8 ${styles.dialogContainer}`}>
      <TotalPriceHeader />
      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-bold">
          Further validation is required, please provide the valid info to
          continue
        </h3>
        <p className="text-sm text-muted">
          You will be redirected to your bank to authenticate and complete
          transaction.
        </p>
      </div>
      <DialogFooter>
        <ButtonFormSubmit
          onClick={onOpenSuccessDialog}
          text="AUTHORIZE WITH BANK"
        />
      </DialogFooter>
    </div>
  );
}
function AccountDetailsContent({
  onOpenVerifyDialog,
  totalAmount,
}: {
  onOpenVerifyDialog: () => void;
  totalAmount: number;
}) {
  const accountNum = "12345678901";

  function handleCopyAccount() {
    copyToClipboard(accountNum);
  }

  return (
    <div className={`flex flex-col gap-y-8`}>
      <TotalPriceHeader totalAmount={totalAmount} />
      <div className="flex flex-col gap-5 md:px-12">
        <h3 className="text-lg font-medium text-center">
          Transfer {totalAmount} to the account below
        </h3>
        <div className="rounded-xl flex flex-col gap-y-2 p-3 bg-[#f6ac7b] bg-opacity-60 text-white">
          <span>PAYSTACK-TITAN</span>
          <div className="flex justify-between flex-wrap gap-3">
            <span className="text-4xl font-bold">{accountNum}</span>
            <button
              className="bg-white py-3 text-sm px-5 rounded-md text-brandSec font-medium"
              onClick={handleCopyAccount}
            >
              COPY
            </button>
          </div>
          <div>
            <p className="text-sm capitalize">
              Use This Account For This Transaction Only.
            </p>
            <p className="text-sm capitalize">Account Expires In 10:00 Mins</p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <ButtonFormSubmit
          onClick={onOpenVerifyDialog}
          text="I HAVE SENT THE MONEY"
        />
      </DialogFooter>
    </div>
  );
}
function VerifyContent({
  onOpenSuccessDialog,
}: {
  onOpenSuccessDialog: () => void;
}) {
  const initialTimeLeft = 5;
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  const handleSetTimeLeft = useCallback((time: number) => {
    setTimeLeft(time);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) onOpenSuccessDialog();
  }, [timeLeft, onOpenSuccessDialog]);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-5 px-12 text-center">
        <h3 className="text-lg font-medium">
          We're verifying your transaction <br />
          This may take a few minutes
        </h3>
        <div className="text-sm text-muted flex justify-center">
          <p>
            Please wait for about{" "}
            <strong className="inline">
              <CountdownTimer
                onSetTimeLeft={handleSetTimeLeft}
                initialSeconds={initialTimeLeft}
              />
              <span> sec{timeLeft > 1 ? "s" : ""}</span>
            </strong>
          </p>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <ButtonFormSubmit text="Cancel" />
        </DialogClose>
      </DialogFooter>
    </div>
  );
}

function TotalPriceHeader({ totalAmount }: { totalAmount: number }) {
  return (
    <DialogHeader>
      <div className="flex justify-between items-center">
        <div className="text-left">
          <DialogTitle>
            <span className="text-2xl font-bold">NGN {totalAmount}</span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-muted">Fund account</span>
          </DialogDescription>
        </div>
        <DialogClose>
          <IoIosClose className="text-4xl bg-red-600 rounded-full text-white" />
        </DialogClose>
      </div>
    </DialogHeader>
  );
}
