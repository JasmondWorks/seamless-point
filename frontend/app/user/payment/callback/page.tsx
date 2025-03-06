"use client";

import {
  verifyPayment as verifyPaymentAction,
  createTransaction,
} from "@/app/_lib/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  console.log(reference);

  const totalAmount = localStorage.getItem("totalAmount");

  console.log(totalAmount);

  console.log(reference);

  useEffect(() => {
    if (reference) {
      verifyPayment(reference, totalAmount);
    }
  }, [reference]);

  const verifyPayment = async (
    reference: string,
    totalAmount: string | null
  ) => {
    const verificationResponse = await verifyPaymentAction(reference);

    console.log(verificationResponse);

    if (verificationResponse.status === "success") {
      // redirect to dashboard with toast success or fail message
      // update user balance
      const depositResponse = await createTransaction({
        amount: Number(totalAmount),
        type: "deposit",
      });
      console.log(depositResponse);

      localStorage.removeItem("totalAmount");

      if (depositResponse.status === "success") {
        toast.success("Payment successful");
        router.push("/user/dashboard");
      } else {
        toast.error("Payment failed");
        router.push("/user/dashboard");
      }
    } else {
      toast.error("Payment failed");
      router.push("/user/dashboard");
    }
  };

  return <p>Verifying payment...</p>;
}
