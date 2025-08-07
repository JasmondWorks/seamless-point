"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import PaystackButton only on the client
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

const PaystackButtonWrapper = ({
  text,
  amount,
  email,
  onSuccess,
  onClose,
  channels = ["card"],
}: {
  text?: "";
  amount: number;
  email: string;
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
  channels?: string[];
}) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

  const componentProps = {
    email,
    amount: amount * 100, // kobo
    metadata: {
      custom_fields: [],
    },
    channels,
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
