import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { useUserAuth } from "@/app/_contexts/UserAuthContext";
import { initiatePayment } from "@/app/_lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

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

  console.log(user);

  const [selectedDialogContent, setSelectedDialogContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const url = await initiatePayment({
        email: user.email,
        amount: (Number(amount) + transactionFee) * 100,
      });

      if (url) {
        router.push(url); // Redirect to Paystack payment page
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initialize payment.");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = Number(amount) + transactionFee;

  //   Paystack config
  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: Number(amount) * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    payment_channels: ["card"], // Only show card payment option
  };

  const onSuccess = (reference: string) => {
    console.log("Payment successful", reference);
    toast.success("Payment successful");

    setTimeout(() => router.push("/user/dashboard"), 2000);
  };

  const onClose = () => {
    toast("Payment popup closed", {
      duration: 4000,
      position: "top-center",
      style: {
        background: "#007bff", // Info blue background
        color: "#ffffff", // White text
        fontWeight: "bold", // Bold font
      },
    });
    console.log("Payment popup closed");
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsDialogOpen(true);
  }

  //   function handleOpenCardDetailsDialog() {
  //     setIsDialogOpen(false);
  //     setSelectedDialogContent(EDialogContent.cardDetails);
  //   }
  //   function handleOpenAccountDetailsDialog() {
  //     setIsDialogOpen(true);
  //     setSelectedDialogContent(EDialogContent.accountDetails);
  //   }
  //   function handleOpenBankValidationDialog() {
  //     setSelectedDialogContent(EDialogContent.bankValidation);
  //   }
  //   function handleOpenVerifyDialog() {
  //     setSelectedDialogContent(EDialogContent.verify);
  //   }
  //   function handleOpenSuccessDialog() {
  //     setSelectedDialogContent(EDialogContent.success);

  //     setTimeout(() => router.push("/user/dashboard"), 2000);
  //   }
  //   function handleCloseDialog() {
  //     setIsDialogOpen(false);
  //     setSelectedDialogContent("");
  //   }

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
          //   <PaystackButton
          //     {...config}
          //     text="I UNDERSTAND"
          //     onSuccess={onSuccess}
          //     onClose={onClose}
          //     className="w-full bg-brandSec text-white py-4 rounded-lg font-medium"
          //   />
          <ButtonFormSubmit
            disabled={loading}
            onClick={handlePayment}
            text={loading ? "Processing..." : "Pay Now"}
          />
        )}
        {selectedPaymentMethod === "bank-transfer" && (
          <ButtonFormSubmit
            // onClick={handleOpenAccountDetailsDialog}
            text="Show account details"
          />
        )}
      </div>
      {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={`${styles.dialogContainer}`}>
          {selectedDialogContent === EDialogContent.cardDetails && (
            <CardDetailsDialogContent
              amount={amount}
              onOpenBankValidationDialog={handleOpenBankValidationDialog}
            />
          )}
          {selectedDialogContent === EDialogContent.bankValidation && (
            <BankValidationContent
              onOpenSuccessDialog={handleOpenSuccessDialog}
            />
          )}
          {selectedDialogContent === EDialogContent.accountDetails && (
            <AccountDetailsContent
              totalAmount={totalAmount}
              onOpenVerifyDialog={handleOpenVerifyDialog}
            />
          )}
          {selectedDialogContent === EDialogContent.verify && (
            <VerifyContent onOpenSuccessDialog={handleOpenSuccessDialog} />
          )}
          {selectedDialogContent === EDialogContent.success && (
            <SuccessDialogContent
              title="Deposit successful"
              onConfirmSuccess={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog> */}
    </>
  );
}

export default Summary;
