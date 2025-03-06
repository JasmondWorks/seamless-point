"use client";

import {
  verifyPayment as verifyPaymentAction,
  updateUserBalance,
} from "@/app/_lib/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  console.log(reference);

  useEffect(() => {
    if (reference) {
      verifyPayment(reference);
    }
  }, [reference]);

  const verifyPayment = async (reference: string) => {
    const response = await verifyPaymentAction(reference);

    console.log(response);

    if (response?.status === "success") {
      // redirect to dashboard with toast success or fail message
      // update user balance
      const updateBalance = await updateUserBalance(response.data.amount);
      // if (updateBalance?.status === "success") {
      router.push("/user/dashboard");
      toast.success("Payment successful");
      // } else {
      //   toast.error("Payment failed");
      // }
    } else {
      router.push("/user/dashboard");
      toast.error("Payment failed");
    }
  };

  return <p>Verifying payment...</p>;
}
