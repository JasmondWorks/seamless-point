"use client";

import styles from "./page.module.css";

import { Input } from "@/app/_components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import SelectPaymentMethod from "@/app/_components/SelectPaymentMethod";
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

  function incrementStep() {
    setStep((step) => step + 1);
  }

  return (
    <DashboardLayout>
      {step === 1 && (
        <Funding
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          incrementStep={incrementStep}
        />
      )}
      {step === 2 && (
        <Amount
          incrementStep={incrementStep}
          amount={amount}
          setAmount={setAmount}
        />
      )}
      {step === 3 && (
        <Summary
          amount={amount}
          selectedPaymentMethod={selectedPaymentMethod}
        />
      )}
    </DashboardLayout>
  );
}

// Step 1
function Funding({
  incrementStep,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: {
  incrementStep: () => void;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (paymentMethod: string) => void;
}) {
  function handleSelectPaymentMethod(type: string) {
    setSelectedPaymentMethod(type);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("here");
    if (!selectedPaymentMethod)
      return toast.error("Please select a payment method");

    incrementStep();
  }

  console.log(selectedPaymentMethod);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-16">
      <div className="space-y-2">
        <h1 className="headline text-center">Select a Payment Method</h1>
        <p className="text-center text-muted">
          Please select one of the two payment methods listed below
        </p>
      </div>
      {/* <DepositAccountDetailsCard /> */}
      <SelectPaymentMethod
        onSelect={handleSelectPaymentMethod}
        selectedPaymentMethod={selectedPaymentMethod}
      />
      <div className="space-y-6">
        <PrivacyPolicyBlock />
        <ButtonFormSubmit onClick={handleSubmit} text="Continue" />
      </div>
    </form>
  );
}

// Step 2
function Amount({
  incrementStep,
  amount,
  setAmount,
}: {
  incrementStep: () => void;
  amount: string;
  setAmount: (amount: string) => void;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!amount) return toast.error("Please enter an amount");
    if (isNaN(Number(amount))) return toast.error("Amount must be a number");

    incrementStep();
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

// Step 3
function Summary({
  amount,
  selectedPaymentMethod,
}: {
  amount: string;
  selectedPaymentMethod: string;
}) {
  const { user } = useUserAuth();
  const [selectedDialogContent, setSelectedDialogContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const transactionFee = 1.5;

  //   Paystack config
  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: Number(amount) * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    payment_channels: ["card"], // Only show card payment option
  };

  const onSuccess = (reference: string) => {
    console.log("Payment successful", reference);
    toast.success("Payment successful");

    setTimeout(() => router.push("/user/dashboard"), 2000);
  };

  const onClose = () => {
    toast("Payment popup closed", {
      duration: 4000,
      position: "top-center",
      style: {
        background: "#007bff", // Info blue background
        color: "#ffffff", // White text
        fontWeight: "bold", // Bold font
      },
    });
    console.log("Payment popup closed");
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsDialogOpen(true);
  }

  function handleOpenCardDetailsDialog() {
    setIsDialogOpen(false);
    setSelectedDialogContent(EDialogContent.cardDetails);
  }
  function handleOpenAccountDetailsDialog() {
    setIsDialogOpen(true);
    setSelectedDialogContent(EDialogContent.accountDetails);
  }
  function handleOpenBankValidationDialog() {
    setSelectedDialogContent(EDialogContent.bankValidation);
  }
  function handleOpenVerifyDialog() {
    setSelectedDialogContent(EDialogContent.verify);
  }
  function handleOpenSuccessDialog() {
    setSelectedDialogContent(EDialogContent.success);

    setTimeout(() => router.push("/user/dashboard"), 2000);
  }
  function handleCloseDialog() {
    setIsDialogOpen(false);
    setSelectedDialogContent("");
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">
          {Number(amount) + transactionFee} NGN
        </h1>
        <div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <div>
              Pay with{" "}
              <span className="capitalize">
                {selectedPaymentMethod.split("-").join(" ")}
              </span>
            </div>
            <span className="capitalize">
              {selectedPaymentMethod.split("-").join(" ")}
            </span>
          </div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Amount to add</span>
            <span>{amount}</span>
          </div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Transaction fee</span>
            <span>1.50</span>
          </div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Amount to pay</span>
            <span className="font-bold">{Number(amount) + transactionFee}</span>
          </div>
        </div>
        <PrivacyPolicyBlock />
        {selectedPaymentMethod === "debit-card" && (
          <PaystackButton
            {...config}
            text="I UNDERSTAND"
            onSuccess={onSuccess}
            onClose={onClose}
            className="w-full bg-brandSec text-white py-4 rounded-lg font-medium"
          />
        )}
        {selectedPaymentMethod === "bank-transfer" && (
          <ButtonFormSubmit
            onClick={handleOpenAccountDetailsDialog}
            text="Show account details"
          />
        )}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={`${styles.dialogContainer}`}>
          {selectedDialogContent === EDialogContent.cardDetails && (
            <CardDetailsDialogContent
              amount={amount}
              onOpenBankValidationDialog={handleOpenBankValidationDialog}
            />
          )}
          {selectedDialogContent === EDialogContent.bankValidation && (
            <BankValidationContent
              onOpenSuccessDialog={handleOpenSuccessDialog}
            />
          )}
          {selectedDialogContent === EDialogContent.accountDetails && (
            <AccountDetailsContent
              totalAmount={Number(amount) + transactionFee}
              onOpenVerifyDialog={handleOpenVerifyDialog}
            />
          )}
          {selectedDialogContent === EDialogContent.verify && (
            <VerifyContent onOpenSuccessDialog={handleOpenSuccessDialog} />
          )}
          {selectedDialogContent === EDialogContent.success && (
            <SuccessDialogContent
              title="Deposit successful"
              onConfirmSuccess={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
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
