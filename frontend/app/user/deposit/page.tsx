"use client";

// import SquadPay from "react-squadpay";
// import { PaystackButton } from "react-paystack";
import styles from "./page.module.css";

import { Input } from "@/app/_components/ui/input";
import SelectDebitCardButton from "@/app/_components/SelectDebitCard";
import DepositAccountDetailsCard from "@/app/_components/DepositAccountDetailsCard";
import React, { useCallback, useEffect, useState } from "react";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import SelectPaymentMethod from "@/app/_components/SelectPaymentMethod";
import { useFormContext } from "@/app/_contexts/FormContext";
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
import { getLocalStorageKey } from "@/app/_lib/utils";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";
import { CreditCardForm } from "@/app/_components/CreditCardForm";
import { IoIosClose } from "react-icons/io";
import CountdownTimer from "@/app/_components/CountdownTimer";
import { copyToClipboard } from "@/app/_utils/utils";
import { useRouter } from "next/navigation";

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

export default function DepositPage() {
  const [step, setStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  function incrementStep() {
    setStep((step) => step + 1);
  }

  if (step === 1) return <Funding incrementStep={incrementStep} />;
  if (step === 2) return <Amount incrementStep={incrementStep} />;
  if (step === 3) return <Summary />;
}

// Step 1
function Funding({ incrementStep }: { incrementStep: () => void }) {
  const { addFormData } = useFormContext();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  function handleSelectPaymentMethod(type: string) {
    setSelectedPaymentMethod(type);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("here");
    if (!selectedPaymentMethod)
      return toast.error("Please select a payment method");

    addFormData({ selectedPaymentMethod });
    incrementStep();
  }

  console.log(selectedPaymentMethod);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
      <div className="space-y-2">
        <h1 className="headline text-center">Funding of Account</h1>
        <p className="text-center text-muted">
          Please Transfer Money To The Account Below Or Choose The Other Option
        </p>
      </div>
      <DepositAccountDetailsCard />
      <SelectPaymentMethod
        onSelect={handleSelectPaymentMethod}
        selectedPaymentMethod={selectedPaymentMethod}
      />

      <PrivacyPolicyBlock />
      <ButtonFormSubmit onClick={handleSubmit} text="I UNDERSTAND" />
    </form>
  );
}

// Step 2
function Amount({ incrementStep }: { incrementStep: () => void }) {
  const { addFormData, formData } = useFormContext();
  const [amount, setAmount] = useState("");

  console.log(formData);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!amount) return toast.error("Please enter an amount");
    if (isNaN(Number(amount))) return toast.error("Amount must be a number");

    addFormData({ amount: Number(amount) });
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
function Summary() {
  const { formData } = useFormContext();
  const [user, setUser] = useState<User>({} as User);
  const [selectedDialogContent, setSelectedDialogContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const transactionFee = 1.5;

  //   Paystack config
  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: formData.amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  //   const initializePayment = usePaystackPayment(config);

  // Move localStorage access to useEffect
  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem(getLocalStorageKey("user")) || "{}"
    ) as User;
    setUser(userData);
  }, []);

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

  //   Squadpay config
  const params = {
    key: process.env.NEXT_PUBLIC_SQUADCO_PUBLIC_KEY!,
    email: user.email, // from HTML form
    amount: formData.amount, // no need to multiply by 100 for kobo, its taken care for you
    currencyCode: "NGN",
  };

  const Close = () => {
    console.log("Widget closed");
  };

  const Load = () => {
    console.log("Widget Loaded");
  };

  /**
   * @param {object} data
   * @description  reponse when payment is successful
   */
  const Success = (data: any) => {
    console.log(data);
    console.log("Widget success");
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">{formData.amount} NGN</h1>
        <div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <div>
              Pay with{" "}
              <span className="capitalize">
                {formData.selectedPaymentMethod.split("-").join(" ")}
              </span>
            </div>
            <span className="capitalize">
              {formData.selectedPaymentMethod.split("-").join(" ")}
            </span>
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
        {/* {formData.selectedPaymentMethod === "debit-card" && (
          <PaystackButton
            {...config}
            text="I UNDERSTAND"
            onSuccess={onSuccess}
            onClose={onClose}
            className="w-full bg-brandSec text-white py-4 rounded-lg font-medium"
          />
        )} */}
        {/* {formData.selectedPaymentMethod === "bank-transfer" && (
          <SquadPay
            className="w-full bg-brandSec text-white py-4 rounded-lg font-medium"
            text="Pay now"
            params={params}
            onClose={Close}
            onLoad={Load}
            onSuccess={(res: any) => Success(res)}
          />
        )} */}
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
