import ConfirmDialogContent from "@/app/_components/ConfirmDialogContent";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { useFormContext } from "@/app/_contexts/FormContext";
import { formatCurrency } from "@/app/_lib/utils";
import { Edit, Plus, Trash2Icon } from "lucide-react";
import React, { useState } from "react";

export default function ParcelItemsList() {
  const {
    formData: {
      items,
      onOpenEditParcelItemDialog,
      onOpenRemoveParcelItemDialog,
    },
  } = useFormContext();

  if (!items?.length) return;

  return (
    <div className="flex flex-col gap-y-2">
      {items?.map((item: any) => (
        <div
          key={item.id}
          className="whitespace-nowrap flex-wrap col-span-2 border border-neutral-300 bg-white rounded-lg p-4 flex items-center justify-between gap-x-16 md:gap-x-5 gap-y-3"
        >
          <div className="text-sm flex flex-col md:flex-row gap-x-10 flex-1">
            <span>{item?.itemName}</span>
            <div className="gap-3 items-center flex md:flex-1 md:justify-center">
              <span className="inline-block md:mx-auto">
                {item?.quantity} {item?.quantity > 1 ? "pcs" : "pc"}
              </span>
              <span>{item?.weight}kg</span>
              <span>
                {!isNaN(item?.value) && formatCurrency(item?.value, "NGN")}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button>
              <Edit
                size={18}
                onClick={() => onOpenEditParcelItemDialog(item)}
              />
            </button>
            <button>
              <Trash2Icon
                size={18}
                onClick={() => onOpenRemoveParcelItemDialog(item)}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
