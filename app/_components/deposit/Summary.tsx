"use client";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";
import { initiatePayment } from "@/app/_lib/actions";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

// dynamic import for paystack button
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  {
    ssr: false,
    loading: () => (
      <div className="w-full bg-brandSec/50 text-white py-4 rounded-lg font-medium text-center animate-pulse">
        Loading payment gateway...
      </div>
    ),
  }
);

function Summary({
  amount,
  selectedPaymentMethod,
  transactionFee,
}: {
  amount: string;
  transactionFee: number;
  selectedPaymentMethod: string;
}) {
  const { user } = useUserAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    // Get the raw redirect string from the URL
    const rawRedirect = searchParams.get("redirect");

    if (rawRedirect) {
      const decoded = decodeURIComponent(rawRedirect);
      setRedirect(decoded);
    }
  }, [searchParams]);

  const totalAmount = Number(amount) + transactionFee;

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Store amount in localStorage for verification later
      localStorage.setItem("totalAmount", totalAmount.toString());

      // Initialize payment with Paystack
      const response = await initiatePayment({
        email: user!.email,
        amount: totalAmount * 100, // Convert to kobo
        metadata: {
          redirectAfterPayment: redirect,
        },
      });

      if (response?.status === "success" && response.data) {
        // Redirect to Paystack checkout page
        router.push(`${response.data}`);
      } else {
        toast.error("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error("Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">{totalAmount} NGN</h1>
        <div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <div>
              Pay with{" "}
              <span className="capitalize">
                {selectedPaymentMethod.split("-").join(" ")}
              </span>
            </div>
            <span className="capitalize">
              {selectedPaymentMethod.split("-").join(" ")}
            </span>
          </div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Amount to add</span>
            <span>{amount}</span>
          </div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Transaction fee</span>
            <span>{transactionFee}</span>
          </div>
          <div className="flex border-b border-neutral-200 justify-between items-center py-3 text-lg">
            <span>Amount to pay</span>
            <span className="font-bold">{totalAmount}</span>
          </div>
        </div>
        <PrivacyPolicyBlock />
        {selectedPaymentMethod === "debit-card" && (
          <ButtonFormSubmit
            onClick={handlePayment}
            text={loading ? "Processing..." : "Pay with Card"}
            disabled={loading}
          />
        )}
        {selectedPaymentMethod === "bank-transfer" && (
          <ButtonFormSubmit text="Show account details" />
        )}
      </div>
    </>
  );
}

export default Summary;
