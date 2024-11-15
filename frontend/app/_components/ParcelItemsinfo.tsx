import { formatCurrency } from "@/app/_lib/utils";
import { Edit, Plus, Trash2Icon } from "lucide-react";
import React, { useState } from "react";

export default function ParcelItemsinfo({ items, onEditItem, onRemoveItem }) {
  return (
    <>
      {items.map((item) => (
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
            <Edit size={18} onClick={() => onEditItem(item)} />
            <Trash2Icon size={18} onClick={() => onRemoveItem(item.id)} />
          </div>
        </div>
      ))}
    </>
  );
}
