"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import { FaApple, FaChevronRight } from "react-icons/fa";
import { Form } from "@/app/_components/ui/form";
import Link from "next/link";

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
import React, { useEffect, useState } from "react";
import { copyToClipboard } from "@/app/_utils/utils";
import { ButtonVariant } from "@/app/_components/Button";
import SuccessDialog from "@/app/_components/Dialogs/SuccessDialog";
import CountdownTimer from "@/app/_components/CountdownTimer";
import { cardDetailsSchema } from "@/app/_lib/validation";

export default function Page() {
  const { formData } = useFormContext();
  const router = useRouter();
  const transactionFee = 1.5;
  const [isAccountInfoDialogOpen, setIsAccountInfoDialogOpen] = useState(false);
  const [isWaitingDialogOpen, setIsWaitingDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isCardDetailsDialogOpen, setIsCardDetailsDialogOpen] = useState(true);
  const [isBankValidationDialogOpen, setIsBankValidationDialogOpen] =
    useState(false);

  function handleSubmit() {
    switch (formData.paymentMethod) {
      case "bank-transfer":
        setIsAccountInfoDialogOpen(true);
        break;
      case "debit-card":
        setIsCardDetailsDialogOpen(true);

      default:
        setIsCardDetailsDialogOpen(true);
        break;
    }
  }
  function handleCloseAllDialogs() {
    setIsAccountInfoDialogOpen(false);
    setIsWaitingDialogOpen(false);
    setIsSuccessDialogOpen(false);
    setIsCardDetailsDialogOpen(false);
  }

  function handleOpenAccountInfoDialog() {
    handleCloseAllDialogs();
    setIsAccountInfoDialogOpen(true);
  }
  function handleOpenBankValidationDialog() {
    handleCloseAllDialogs();
    setIsBankValidationDialogOpen(true);
  }
  function handleOpenWaitingDialog() {
    handleCloseAllDialogs();
    setIsWaitingDialogOpen(true);
  }
  function handleOpenSuccessDialog() {
    handleCloseAllDialogs();
    setIsSuccessDialogOpen(true);
  }

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`flex flex-col gap-10`}
      >
        <h1 className="headline text-center">{formData.amount} NGN</h1>
        <div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Pay with card</span>
            <span>Debit card</span>
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
        <ButtonFormSubmit onClick={handleSubmit} text="I UNDERSTAND" />
      </form>
      {/* Bank Transfer Dialogs */}
      <AccountInfoDialog
        open={isAccountInfoDialogOpen}
        onOpenChange={setIsAccountInfoDialogOpen}
        onOpenWaitingDialog={handleOpenWaitingDialog}
      />
      <WaitingDialog
        open={isWaitingDialogOpen}
        onOpenChange={setIsWaitingDialogOpen}
        onOpenSuccessDialog={handleOpenSuccessDialog}
      />
      {isSuccessDialogOpen && (
        <SuccessDialog
          isOpen={isSuccessDialogOpen}
          onOpenChange={setIsSuccessDialogOpen}
        />
      )}

      {/* Debit Card Dialogs */}
      <CardDetailsDialog
        open={isCardDetailsDialogOpen}
        onOpenChange={setIsCardDetailsDialogOpen}
        onOpenBankValidationDialog={handleOpenBankValidationDialog}
      />
      <BankValidationDialog
        open={isBankValidationDialogOpen}
        onOpenChange={setIsBankValidationDialogOpen}
        onOpenBankValidationDialog={handleOpenSuccessDialog}
      />
    </>
  );
}

function CardDetailsDialog({ open, onOpenChange, onOpenBankValidationDialog }) {
  const { formData } = useFormContext();
  const transactionFee = 1.5;
  const totalAmount = formData.amount + transactionFee;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof cardDetailsSchema>>({
    resolver: zodResolver(cardDetailsSchema),
    defaultValues: {
      cardNumber: "",
      cvv: "",
      expiryDate: "",
    },
  });

  async function onSubmit(data: z.infer<typeof cardDetailsSchema>) {
    console.log(data);
    onOpenBankValidationDialog();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`flex flex-col w-[90vw] gap-y-8 ${styles.dialogContainer}`}
      >
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
        <div className="space-y-8">
          <h3 className="text-2xl font-bold">Enter your card details to pay</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-5">
                <CustomFormField
                  className="col-span-2"
                  label="CARD NUMBER"
                  name="cardNumber"
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="Example"
                />
                <CustomFormField
                  label="EXPIRY"
                  name="expiryDate"
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="MM/YY"
                />
                <CustomFormField
                  label="CVV"
                  name="cvv"
                  control={form.control}
                  fieldType={FormFieldType.PASSWORD}
                  placeholder="123"
                />
              </div>
              <ButtonFormSubmit
                onClick={onOpenBankValidationDialog}
                text="I UNDERSTAND"
              />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
function BankValidationDialog({ open, onOpenChange, onOpenSuccessDialog }) {
  const { formData } = useFormContext();
  const transactionFee = 1.5;
  const totalAmount = formData.amount + transactionFee;

  const form = useForm<z.infer<typeof cardDetailsSchema>>({
    resolver: zodResolver(cardDetailsSchema),
    defaultValues: {
      cardNumber: "",
      cvv: "",
      expiryDate: "",
    },
  });

  async function onSubmit(data: z.infer<typeof cardDetailsSchema>) {
    console.log(data);
    onOpenBankValidationDialog();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`flex flex-col w-[90vw] gap-y-8 ${styles.dialogContainer}`}
      >
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
        <div className="space-y-8">
          <h3 className="text-2xl font-bold">Enter your card details to pay</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-5">
                <CustomFormField
                  className="col-span-2"
                  label="CARD NUMBER"
                  name="cardNumber"
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="Example"
                />
                <CustomFormField
                  label="EXPIRY"
                  name="expiryDate"
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="MM/YY"
                />
                <CustomFormField
                  label="CVV"
                  name="cvv"
                  control={form.control}
                  fieldType={FormFieldType.PASSWORD}
                  placeholder="123"
                />
              </div>
              <ButtonFormSubmit
                onClick={onOpenBankValidationDialog}
                text="I UNDERSTAND"
              />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AccountInfoDialog({ open, onOpenChange, onOpenWaitingDialog }) {
  const { formData } = useFormContext();
  const transactionFee = 1.5;
  const totalAmount = formData.amount + transactionFee;
  const accountNum = "12345678901";
  function handleCopyAccount() {
    copyToClipboard(accountNum);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`flex flex-col w-[90vw] gap-y-8 ${styles.dialogContainer}`}
      >
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
              <p className="text-sm capitalize">
                Account Expires In 10:00 Mins
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <ButtonFormSubmit
            onClick={onOpenWaitingDialog}
            text="I HAVE SENT THE MONEY"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function WaitingDialog({ open, onOpenChange, onOpenSuccessDialog }) {
  const initialTimeLeft = 5;
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  function handleSetTimeLeft(timeLeft) {
    setTimeLeft(timeLeft);
  }

  useEffect(() => {
    if (timeLeft === 0) return onOpenSuccessDialog();
  }, [timeLeft]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`flex flex-col gap-y-8 ${styles.dialogContainer}`}
      >
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle>
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
        <div className="flex flex-col gap-5 px-12 text-center">
          <h3 className="text-lg font-medium">
            We're verifying your transaction <br />
            This may take a few minutes
          </h3>
          <div className="text-sm text-muted flex justify-center">
            <p>Please wait for about</p>
            <strong className="flex gap-1">
              <CountdownTimer
                onSetTimeLeft={handleSetTimeLeft}
                initialSeconds={initialTimeLeft}
              />
              <span> sec{timeLeft > 1 ? "s" : ""}</span>
            </strong>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <ButtonFormSubmit text="Cancel" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
