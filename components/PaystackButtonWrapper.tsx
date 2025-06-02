// components/PaystackButtonWrapper.tsx
"use client";

import React from "react";
import { PaystackButton } from "react-paystack";

const PaystackButtonWrapper = ({
  text,
  amount,
  email,
  onSuccess,
  onClose,
}: {
  text?: "";
  amount: number;
  email: string;
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
}) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

  const componentProps = {
    email,
    amount: amount * 100, // kobo
    metadata: {
      custom_fields: [],
    },
    publicKey,
    text: text || "Pay Now",
    onSuccess,
    onClose,
  };

  return (
    <PaystackButton
      {...componentProps}
      className="bg-brand text-white px-4 py-2 rounded w-full"
    />
  );
};

export default PaystackButtonWrapper;
