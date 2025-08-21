"use client";

import React, { ReactNode } from "react";
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
  text?: string | ReactNode;
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

  return <PaystackButton {...componentProps} />;
};

export default PaystackButtonWrapper;
