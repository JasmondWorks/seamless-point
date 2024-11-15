import { Checkbox } from "@/app/_components/ui/checkbox";
import React from "react";
import DebitCard from "./DebitCard";
import { PlusCircledIcon } from "@radix-ui/react-icons";

type Props = {
  onUpdatePayment?: any;
  onInitiateRemoveCard?: any;
  onUpdateCard?: any;
};
export default function SelectDebitCard({
  onUpdatePayment,
  onInitiateRemoveCard,
  onUpdateCard,
}: Props) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center py-3 border-b border-neutral-200">
        <span>Debit card</span>
        <PlusCircledIcon className="text-brandSec text-2xl" />
      </div>
      <div className="flex gap-5 flex-wrap">
        <DebitCard
          onUpdatePayment={onUpdatePayment}
          onInitiateRemoveCard={onInitiateRemoveCard}
          onUpdateCard={onUpdateCard}
        />
        <DebitCard
          onUpdatePayment={onUpdatePayment}
          onInitiateRemoveCard={onInitiateRemoveCard}
          onUpdateCard={onUpdateCard}
        />
        <DebitCard
          onUpdatePayment={onUpdatePayment}
          onInitiateRemoveCard={onInitiateRemoveCard}
          onUpdateCard={onUpdateCard}
        />
      </div>
    </div>
  );
}
