import ConfirmDialogContent from "@/app/_components/ConfirmDialogContent";
import { CreditCardForm } from "@/app/_components/CreditCardForm";
import DialogMainHeader from "@/app/_components/DialogMainHeader";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { useFormContext } from "@/app/_contexts/FormContext";
import React, { useEffect, useState } from "react";

enum EDialogContent {
  removeCard = "REMOVE_CARD",
  success = "SUCCESS",
  updateCard = "UPDATE",
  updateCardSuccess = "UPDATE_CARD_SUCCESS",
}

export default function DebitCard({ card }) {
  const {
    formData: {
      onRemoveDebitCard,
      onSelectDebitCard,
      selectedDebitCard,
      // debitCards,
    },
  } = useFormContext();

  console.log(selectedDebitCard);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDialogContent, setSelectedDialogContent] = useState("");
  // const [selectedCardToEdit, setSelectedCardToEdit] = useState(null);
  let isSelected;

  useEffect(() => {
    isSelected = card.id === selectedDebitCard;
  }, [selectedDebitCard]);

  function handleRemoveDebitCard() {
    onRemoveDebitCard(card.id);
    handleOpenSuccessCardDialog();
  }
  function handleSelectDebitCard(e) {
    onSelectDebitCard(e.target.value);
    console.log(e.target.value);
  }

  function handleOpenUpdateCardDialog() {
    setIsDialogOpen(true);
    setSelectedDialogContent(EDialogContent.updateCard);
  }
  function handleOpenRemoveCardDialog() {
    setIsDialogOpen(true);
    setSelectedDialogContent(EDialogContent.removeCard);
  }
  function handleOpenSuccessCardDialog() {
    setIsDialogOpen(true);
    setSelectedDialogContent(EDialogContent.success);
  }
  function handleOpenUpdateCardSuccessDialog() {
    setSelectedDialogContent(EDialogContent.updateCardSuccess);
  }

  return (
    <>
      <label className="cursor-pointer p-5 bg-white justify-between gap-5 flex items-start rounded-2xl border border-neutral-200 leading-4">
        <div className="flex flex-col md:flex-row gap-5 items-start">
          <div className="border p-1 px-2 border-neutral-200 rounded-lg">
            <svg
              width={30}
              height={19}
              viewBox="0 0 30 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9053 15.9396C13.3266 17.2704 11.2787 18.0737 9.04092 18.0737C4.04776 18.0737 0 14.0741 0 9.14036C0 4.20662 4.04776 0.207031 9.04092 0.207031C11.2787 0.207031 13.3266 1.01036 14.9053 2.34109C16.484 1.01036 18.5319 0.207031 20.7697 0.207031C25.7628 0.207031 29.8106 4.20662 29.8106 9.14036C29.8106 14.0741 25.7628 18.0737 20.7697 18.0737C18.5319 18.0737 16.484 17.2704 14.9053 15.9396Z"
                fill="#ED0006"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9053 15.9396C16.8492 14.3011 18.0818 11.863 18.0818 9.14036C18.0818 6.41776 16.8492 3.97962 14.9053 2.34108C16.484 1.01036 18.5319 0.207031 20.7697 0.207031C25.7628 0.207031 29.8106 4.20662 29.8106 9.14036C29.8106 14.0741 25.7628 18.0737 20.7697 18.0737C18.5319 18.0737 16.484 17.2704 14.9053 15.9396Z"
                fill="#F9A000"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9053 15.9393C16.8492 14.3008 18.0818 11.8627 18.0818 9.14007C18.0818 6.41748 16.8492 3.97936 14.9053 2.34082C12.9614 3.97936 11.7288 6.41748 11.7288 9.14007C11.7288 11.8627 12.9614 14.3008 14.9053 15.9393Z"
                fill="#FF5E00"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start gap-3">
            <span className="text-xl leading-tight">
              Visa ending in {card.cardNumber.slice(-4)}
            </span>
            <span>
              Expiry {card.expiryMonth}/{card.expiryYear}
            </span>
            <span
              onClick={handleOpenUpdateCardDialog}
              className="cursor-pointer mt-5 text-purple-700 font-bold"
            >
              Edit
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Input
            className="w-3 !h-auto"
            value={card.id}
            checked={isSelected}
            onChange={handleSelectDebitCard}
            type="radio"
            name="debitCard"
          />
          {/* Delete icon button */}
          <button onClick={handleOpenRemoveCardDialog}>
            <svg
              width={14}
              height={16}
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.75 4H0.25V6.25C0.647825 6.25 1.02936 6.40804 1.31066 6.68934C1.59196 6.97064 1.75 7.35218 1.75 7.75V10.75C1.75 12.871 1.75 13.9323 2.40925 14.5907C3.06775 15.25 4.129 15.25 6.25 15.25H7.75C9.87175 15.25 10.9323 15.25 11.5907 14.5907C12.2508 13.9323 12.2507 12.871 12.2507 10.75V7.75C12.2507 7.35218 12.4088 6.97064 12.6901 6.68934C12.9714 6.40804 13.3529 6.25 13.7507 6.25L13.75 4ZM5.875 7.75C5.875 7.55109 5.79598 7.36032 5.65533 7.21967C5.51468 7.07902 5.32391 7 5.125 7C4.92609 7 4.73532 7.07902 4.59467 7.21967C4.45402 7.36032 4.375 7.55109 4.375 7.75V11.5C4.375 11.6989 4.45402 11.8897 4.59467 12.0303C4.73532 12.171 4.92609 12.25 5.125 12.25C5.32391 12.25 5.51468 12.171 5.65533 12.0303C5.79598 11.8897 5.875 11.6989 5.875 11.5V7.75ZM9.625 7.75C9.625 7.55109 9.54598 7.36032 9.40533 7.21967C9.26468 7.07902 9.07391 7 8.875 7C8.67609 7 8.48532 7.07902 8.34467 7.21967C8.20402 7.36032 8.125 7.55109 8.125 7.75V11.5C8.125 11.6989 8.20402 11.8897 8.34467 12.0303C8.48532 12.171 8.67609 12.25 8.875 12.25C9.07391 12.25 9.26468 12.171 9.40533 12.0303C9.54598 11.8897 9.625 11.6989 9.625 11.5V7.75Z"
                fill="#C00505"
              />
              <path
                d="M5.55103 2.02762C5.63653 1.94812 5.82478 1.87762 6.08728 1.82737C6.38854 1.77388 6.69406 1.74802 7.00003 1.75012C7.33003 1.75012 7.65103 1.77712 7.91278 1.82737C8.17453 1.87762 8.36278 1.94812 8.44903 2.02837"
                stroke="#C00505"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </label>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="dialogContainer">
          {selectedDialogContent === EDialogContent.removeCard && (
            <ConfirmDialogContent
              title="Remove Card"
              description="Are you sure you want to remove this card? This action cannot be undone."
              onConfirm={handleRemoveDebitCard}
            />
          )}
          {selectedDialogContent === EDialogContent.success && (
            <SuccessDialogContent />
          )}
          {selectedDialogContent === EDialogContent.updateCardSuccess && (
            <SuccessDialogContent title="Card information has been updated" />
          )}
          {selectedDialogContent === EDialogContent.updateCard && (
            <UpdatePaymentDialogContent
              onOpenSuccessDialog={handleOpenUpdateCardSuccessDialog}
              card={card}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function UpdatePaymentDialogContent({ card, onOpenSuccessDialog }) {
  const {
    formData: { onUpdateDebitCard },
  } = useFormContext();
  function onSubmit(data) {
    console.log(data);
    onUpdateDebitCard(card.id, data);
    onOpenSuccessDialog();
  }

  return (
    <div className="flex flex-col gap-y-6">
      <DialogMainHeader
        title="Update payment method"
        subtitle="Update your card details"
      />
      <CreditCardForm cardDetails={card} onSubmit={onSubmit} />
    </div>
  );
}
