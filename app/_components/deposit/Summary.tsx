"use client";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import VirtualAccountModal from "@/app/_components/VirtualAccountModal";
import {
  getUser,
  initiatePayment,
  createVirtualAccount,
} from "@/app/_lib/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { showToast } from "@/app/_lib/toast";

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
  const router = useRouter();

  const [isLoadingProcessingPayment, setIsLoadingProcessingPayment] =
    useState(false);
  const [isLoadingAccountDetails, setIsLoadingAccountDetails] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const searchParams = useSearchParams();
  const [redirect, setRedirect] = useState("");
  const [user, setUser] = useState<{
    email: string;
    virtualAccount: {
      accountNumber: string;
      accountName: string;
      customerCode: string;
    };
  } | null>(null);

  console.log(user);

  useEffect(() => {
    async function fetchUser() {
      setIsLoadingUser(true);
      const res = await getUser();
      setIsLoadingUser(false);

      if (res.status === "success") setUser(res.user);
    }

    fetchUser();
  }, []);

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
      setIsLoadingProcessingPayment(true);

      // Store amount in localStorage for verification later
      localStorage.setItem("totalAmount", totalAmount.toString());

      const response = await initiatePayment({
        email: user?.email!,
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
      setIsLoadingProcessingPayment(false);
    }
  };

  const handleShowAccount = async () => {
    // Check if user already has a virtual account

    console.log("user state", user);
    if (
      user?.virtualAccount &&
      user?.virtualAccount?.accountNumber &&
      user?.virtualAccount?.accountName &&
      user?.virtualAccount?.customerCode
    ) {
      setShowAccountModal(true);
      setIsLoadingAccountDetails(false);
      return;
    }

    setIsLoadingAccountDetails(true);
    const res = await getUser();

    if (res.status === "success") {
      const user = res.user;
      console.log("user", user);

      // if (
      //   user?.virtualAccount &&
      //   user?.virtualAccount?.accountNumber &&
      //   user?.virtualAccount?.accountName &&
      //   user?.virtualAccount?.customerCode
      // ) {
      //   setShowAccountModal(true);
      //   setIsLoadingAccountDetails(false);
      //   return;
      // }

      if (!user?.phoneNumber) {
        showToast(
          "Kindly update your phone number in the profile page. Redirecting to profile page...",
          "info"
        ),
          setTimeout(() => router.push("/user/settings"), 3000);
        setIsLoadingAccountDetails(false);
        return;
      }
    }

    // Generate virtual account if not exists
    console.log("b4 api call");
    const response: any = await createVirtualAccount();
    console.log("after api call");

    console.log(response);

    if (response.status === "success") {
      setShowAccountModal(true);
      toast.success("Virtual account created successfully!");
    }

    setIsLoadingAccountDetails(false);
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
            isLoading={isLoadingProcessingPayment}
            onClick={handlePayment}
            text={
              isLoadingProcessingPayment ? "Processing..." : "Pay with Card"
            }
            disabled={isLoadingProcessingPayment}
          />
        )}
        {selectedPaymentMethod === "bank-transfer" && (
          <ButtonFormSubmit
            isLoading={isLoadingAccountDetails}
            onClick={handleShowAccount}
            text={
              isLoadingAccountDetails
                ? "Generating account..."
                : "Show account details"
            }
            disabled={isLoadingAccountDetails || isLoadingUser}
          />
        )}

        <VirtualAccountModal
          amount={totalAmount}
          isOpen={showAccountModal}
          onClose={() => setShowAccountModal(false)}
        />
      </div>
    </>
  );
}

export default Summary;
