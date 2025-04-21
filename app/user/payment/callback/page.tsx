"use client";

import { useUserAuth } from "@/app/_contexts/UserAuthContext";
import {
  verifyPayment as verifyPaymentAction,
  createTransaction,
  getUser,
} from "@/app/_lib/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
  const { setUser } = useUserAuth();

  console.log("reference", reference);

  const isProcessing = useRef(false); // Track if the function has already run

  const handlePaymentError = (message: string) => {
    toast.error(message);
    console.error(message);
    return router.push("/user/dashboard");
  };

  useEffect(() => {
    if (reference && !isProcessing.current) {
      isProcessing.current = true; // Prevent multiple calls
      verifyPayment(reference);
    }
  }, [reference]);

  const verifyPayment = async (reference: string) => {
    const verificationResponse = await verifyPaymentAction(reference);

    toast.success(verificationResponse.data.message);

    console.log("verificationResponse", verificationResponse);

    if (verificationResponse.status !== "success")
      handlePaymentError(verificationResponse.data.message);

    // Create transaction only after verification is successful
    const depositResponse = await createTransaction({
      amount: verificationResponse.data.data.amount,
      type: "deposit",
      reference,
    });

    if (depositResponse.status !== "success")
      handlePaymentError(depositResponse?.data?.message || "Deposit failed");

    const updatedUser = await getUser();
    setUser(updatedUser.user);

    toast.success(
      `${verificationResponse.data.data.amount} successfully deposited into your account`
    );
    router.push("/user/dashboard");

    localStorage.removeItem("totalAmount");
  };

  return <p>Verifying payment...</p>;
}
