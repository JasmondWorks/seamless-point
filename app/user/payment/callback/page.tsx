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

  useEffect(() => {
    if (reference && !isProcessing.current) {
      isProcessing.current = true; // Prevent multiple calls
      verifyPayment(reference);
    }
  }, [reference]);

  const verifyPayment = async (reference: string) => {
    try {
      const verificationResponse = await verifyPaymentAction(reference);

      console.log("verificationResponse", verificationResponse);

      if (verificationResponse.status === "success") {
        // Create transaction only after verification is successful
        const depositResponse = await createTransaction({
          amount: verificationResponse.data.data.amount,
          type: "deposit",
          reference,
        });

        if (depositResponse.status === "error") {
          toast.error("Payment processing failed");
          return router.push("/user/dashboard");
        }

        const updatedUser = await getUser();
        setUser(updatedUser.user);
        toast.success("Payment successful");
        router.push("/user/dashboard");
      } else {
        toast.error("Payment verification failed");
        router.push("/user/dashboard");
      }
    } catch (error) {
      toast.error("Payment processing failed");
      router.push("/user/dashboard");
    } finally {
      localStorage.removeItem("totalAmount");
    }
  };

  return <p>Verifying payment...</p>;
}
