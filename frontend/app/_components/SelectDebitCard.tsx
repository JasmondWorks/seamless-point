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
import { creditCardSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { Form } from "@/app/_components/ui/form";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";
import { CreditCardForm } from "@/app/_components/CreditCardForm";

enum EDialogContent {
  addDebitCard = "ADD DEBIT CARD",
  success = "SUCCESS",
}

type CreditCardFormData = z.infer<typeof creditCardSchema>;

export default function SelectDebitCard() {
  const [debitCards, setDebitCards] = useState([
    // {
    //   cardNumber: "0187 8179 8176 1891",
    //   expiryMonth: "05",
    //   expiryYear: "24",
    //   cvv: "339",
    //   id: "be8fec82-6f71-49ee-869f-818b2c5bd361",
    // },
  ]);
  const { setFormData, formData, addFormData } = useFormContext();
  const [selectedDebitCard, setSelectedDebitCard] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDialogContent, setSelectedDialogContent] = useState("");

  console.log(debitCards);

  useEffect(() => {
    setFormData({
      ...formData,
      onAddDebitCard: handleAddDebitCard,
      onRemoveDebitCard: handleRemoveDebitCard,
      onSelectDebitCard: handleSelectDebitCard,
      onUpdateDebitCard: handleUpdateDebitCard,
      selectedDebitCard,
      debitCards: [],
    });
  }, [isDialogOpen]);

  function handleOpenAddDebitCardDialog() {
    setIsDialogOpen(true);
    setSelectedDialogContent(EDialogContent.addDebitCard);
  }
  function handleOpenSuccessDialog() {
    setSelectedDialogContent(EDialogContent.success);
  }

  function handleUpdateDebitCard(id, cardDetails) {
    const updatedCards = debitCards.map((card) =>
      card.id === id ? { id: card.id, ...cardDetails } : card
    );
    setDebitCards(updatedCards);
  }

  function handleSelectDebitCard(id) {
    setSelectedDebitCard(id);
    addFormData({ selectedDebitCard: id });
  }
  function handleAddDebitCard(newCardDetails) {
    const newCard = { ...newCardDetails, id: crypto.randomUUID() };

    setDebitCards((prevItems) => [...prevItems, newCard]);
    setFormData({
      ...formData,
      debitCards: formData?.debitCards?.length
        ? [...formData.debitCards, newCard]
        : [newCard],
    });
  }
  function handleRemoveDebitCard(id: string) {
    setDebitCards(debitCards.filter((debitCard) => debitCard.id !== id));
  }
  function handleCloseDialog() {
    setIsDialogOpen(false);
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
      {debitCards && debitCards.length !== 0 && (
        <div className="flex flex-col sm:flex-row gap-5 flex-wrap">
          {debitCards.map((card) => (
            <DebitCard key={card.id} card={card} />
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={styles.dialogContainer}>
          {selectedDialogContent === EDialogContent.addDebitCard && (
            <AddDebitCardDialogContent onCloseDialog={handleCloseDialog} />
          )}
          {selectedDialogContent === EDialogContent.success && (
            <SuccessDialogContent />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddDebitCardDialogContent({ onCloseDialog }) {
  const balance = 20_000;
  const {
    formData: { onAddDebitCard },
  } = useFormContext();

  const onSubmit = (data: CreditCardFormData) => {
    console.log("Submitted Data:", data);

    onAddDebitCard(data);
    onCloseDialog();
  };

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
      <CreditCardForm onSubmit={onSubmit} />
    </div>
  );
}
