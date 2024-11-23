import React, { useState } from "react";

export default function SelectPaymentMethod({
  onSelect,
  selectedPaymentMethod,
}) {
  function handleSelectPaymentMethod(e) {
    onSelect(e.target.value);
  }
  return (
    <div className="flex flex-col gap-6">
      <label className="pb-3 cursor-pointer border-b border-neutral-200 flex justify-between items-center">
        <span>Debit card</span>
        <input
          onChange={handleSelectPaymentMethod}
          value="debit-card"
          type="radio"
          checked={selectedPaymentMethod === "debit-card"}
          name="paymentType"
        />
      </label>
      <label className="pb-3 cursor-pointer border-b border-neutral-200 flex justify-between items-center">
        <span>Virtual bank transfer</span>
        <input
          onChange={handleSelectPaymentMethod}
          value="bank-transfer"
          type="radio"
          checked={selectedPaymentMethod === "bank-transfer"}
          name="paymentType"
        />
      </label>
    </div>
  );
}
