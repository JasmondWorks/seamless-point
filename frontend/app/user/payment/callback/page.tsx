"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (reference) {
      verifyPayment(reference);
    }
  }, [reference]);

  const verifyPayment = async (reference: string) => {
    const response = await fetch(`/api/paystack/verify?reference=${reference}`);
    const data = await response.json();

    if (data.status) {
      router.push("/payment/success"); // Redirect to success page
    } else {
      router.push("/payment/failure"); // Redirect to failure page
    }
  };

  return <p>Verifying payment...</p>;
}
