"use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import CustomFormField, {
//   FormFieldType,
// } from "@/app/_components/CustomFormField";
// import { Form } from "@/app/_components/ui/form";

import { IoIosClose } from "react-icons/io";

import styles from "./page.module.css";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { useFormContext } from "@/app/_contexts/FormContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { copyToClipboard } from "@/app/_utils/utils";
// import { ButtonVariant } from "@/app/_components/Button";
// import SuccessDialog from "@/app/_components/Dialogs/SuccessDialog";
import CountdownTimer from "@/app/_components/CountdownTimer";
// import Badge, { BadgeVariant } from "@/app/_components/Badge";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";
import { CreditCardForm } from "@/app/_components/CreditCardForm";
// import { usePaystackPayment } from "react-paystack";
import { PaystackButton } from "react-paystack";
import { getLocalStorageKey } from "@/app/_lib/utils";

enum EDialogContent {
  cardDetails = "CARD_DETAILS",
  bankValidation = "BANK_VALIDATION",
  accountDetails = "ACCOUNT_DETAILS",
  verify = "VERIFY",
  success = "SUCCESS",
}

const onSuccess = (reference: any) => {
  console.log("success");
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

interface User {
  email: string;
  [key: string]: any;
}

export default function Page() {
  const { formData } = useFormContext();
  const { paymentMethod } = formData;
  const [user, setUser] = useState<User>({} as User);
  const [selectedDialogContent, setSelectedDialogContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: formData.amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  // const initializePayment = usePaystackPayment(config);

  // Move localStorage access to useEffect
  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem(getLocalStorageKey("user")) || "{}"
    ) as User;
    setUser(userData);
  }, []);

  const router = useRouter();
  const transactionFee = 1.5;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsDialogOpen(true);

    switch (formData.selectedPaymentMethod) {
      case "bank-transfer":
        handleOpenAccountDetailsDialog();
        break;
      case "debit-card":
        handleOpenCardDetailsDialog();
        break;
      default:
        return;
    }
  }

  function handleOpenCardDetailsDialog() {
    setIsDialogOpen(false);
    setSelectedDialogContent(EDialogContent.cardDetails);
  }
  function handleOpenAccountDetailsDialog() {
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
  }
  function handleCloseDialog() {
    setIsDialogOpen(false);
    setSelectedDialogContent("");
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">{formData.amount} NGN</h1>
        <div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Pay with {paymentMethod}</span>
            <span>{paymentMethod}</span>
          </div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Amount to add</span>
            <span>{formData.amount}</span>
          </div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Transaction fee</span>
            <span>1.50</span>
          </div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Amount to pay</span>
            <span className="font-bold">
              {Number(formData.amount) + transactionFee}
            </span>
          </div>
        </div>
        <PrivacyPolicyBlock />
        {/* <PaystackButton
          {...config}
          text="I UNDERSTAND"
          onSuccess={onSuccess}
          onClose={onClose}
          className="w-full bg-brandSec text-white py-4 rounded-lg font-medium"
        /> */}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={`${styles.dialogContainer}`}>
          {selectedDialogContent === EDialogContent.cardDetails && (
            <CardDetailsDialogContent
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
}: {
  onOpenBankValidationDialog: () => void;
}) {
  return (
    <div className={`flex flex-col gap-y-8`}>
      <TotalPriceHeader />
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
}: {
  onOpenVerifyDialog: () => void;
}) {
  const { formData } = useFormContext();
  const transactionFee = 1.5;
  const totalAmount = formData.amount + transactionFee;
  const accountNum = "12345678901";

  function handleCopyAccount() {
    copyToClipboard(accountNum);
  }

  return (
    <div className={`flex flex-col gap-y-8`}>
      <TotalPriceHeader />
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

function TotalPriceHeader() {
  const { formData } = useFormContext();
  const transactionFee = 1.5;
  const totalAmount = formData.amount + transactionFee;

  return (
    <DialogHeader>
      <div className="flex justify-between items-center">
        <div>
          <DialogTitle asChild>
            <h1 className="text-xl font-bold">NGN {totalAmount}</h1>
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
