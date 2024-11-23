"use client";

import styles from "./SelectDebitCard.module.css";

import React, { useEffect, useState } from "react";
import DebitCard from "./DebitCard";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useFormContext } from "@/app/_contexts/FormContext";
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cardDetailsSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { Form } from "@/app/_components/ui/form";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";

enum EDialogContent {
  addDebitCard = "ADD DEBIT CARD",
  success = "SUCCESS",
}

export default function SelectDebitCard() {
  const [debitCards, setDebitCards] = useState([]);
  const { setFormData, formData } = useFormContext();
  const [selectedDebitCard, setSelectedDebitCard] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDialogContent, setSelectedDialogContent] = useState("");

  useEffect(() => {
    setFormData({
      ...formData,
      onAddDebitCard: handleAddDebitCard,
      onRemoveDebitCard: handleRemoveDebitCard,
      onSelectDebitCard: handleSelectDebitCard,
      selectedDebitCard,
    });
  }, []);

  function handleOpenAddDebitCardDialog() {
    setIsDialogOpen(true);
    setSelectedDialogContent(EDialogContent.addDebitCard);
  }
  function handleOpenSuccessDialog() {
    setSelectedDialogContent(EDialogContent.success);
  }

  function handleSelectDebitCard(id) {
    setSelectedDebitCard(id);
  }
  function handleAddDebitCard(cardDetails) {
    setDebitCards((cur) => {
      [...cur, cardDetails];
    });
  }
  function handleRemoveDebitCard(id: string) {
    setDebitCards(debitCards.filter((debitCard) => debitCard.id !== id));
  }
  return (
    <div className="space-y-10">
      <button
        onClick={handleOpenAddDebitCardDialog}
        className="flex w-full justify-between items-center py-3 border-b border-neutral-200"
      >
        <span>Debit card</span>
        <PlusCircledIcon className="text-brandSec text-2xl" />
      </button>
      {debitCards.length !== 0 && (
        <div className="flex gap-5 flex-wrap">
          {debitCards.map((card) => (
            <DebitCard card={card} />
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={styles.dialogContainer}>
          {selectedDialogContent === EDialogContent.addDebitCard && (
            <AddDebitCardDialogContent />
          )}
          {selectedDialogContent === EDialogContent.success && (
            <SuccessDialogContent />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddDebitCardDialogContent() {
  const balance = 20_000;
  const {
    formData: { onAddDebitCard },
  } = useFormContext();

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

    onAddDebitCard(data);
  }

  return (
    <div className="flex flex-col gap-y-8">
      <DialogHeader>
        <div className="flex justify-between items-center">
          <div>
            <DialogTitle asChild>
              <h1 className="text-xl font-bold">NGN {balance}</h1>
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
      <h3 className="text-2xl font-bold">
        Enter your card details to withdraw
      </h3>
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
          <ButtonFormSubmit text="I UNDERSTAND" />
        </form>
      </Form>
    </div>
  );
}
