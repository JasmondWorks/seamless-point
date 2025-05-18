"use client";

import DashboardLayout from "@/app/_components/DashboardLayout";
import DeliveryReceiverForm from "@/app/_components/DeliveryReceiverForm";
import DeliverySourceForm from "@/app/_components/DeliverySourceForm";
import SelectDeliveryType from "@/app/_components/SelectDeliveryType";
import ParcelInfoForm from "@/app/_components/ParcelInfoForm";
import { useEffect, useState } from "react";
import RatesList from "@/app/_components/RatesList";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import PackageDetails from "@/app/_components/PackageDetails";

import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";

import BalanceDisplay from "@/app/_components/BalanceDisplay";
import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";

import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";

import { base64ToFile, getNewDeliveryData, uploadFile } from "@/app/_lib/utils";
import useCreateDelivery from "@/app/_hooks/deliveries/useCreateDelivery";
import { getUser } from "@/app/_lib/actions";
import SpinnerFull from "@/app/_components/SpinnerFull";
import AlertDialog from "@/app/_components/Dialogs/AlertDialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Button, { ButtonVariant } from "@/app/_components/Button";
import { useRouter, useSearchParams } from "next/navigation";

export default function Register() {
  const searchParams = useSearchParams();

  const [activePage, setActivePage] = useState(
    searchParams.get("activePage") || "delivery-type"
  );

  function handleSetActivePage(page: string) {
    setActivePage(page);
  }

  return (
    <DashboardLayout>
      {activePage === "delivery-type" && (
        <DeliveryType onSetActivePage={handleSetActivePage} />
      )}
      {activePage === "sender" && (
        <Sender onSetActivePage={handleSetActivePage} />
      )}
      {activePage === "receiver" && (
        <Receiver onSetActivePage={handleSetActivePage} />
      )}
      {activePage === "parcel-info" && (
        <ParcelInfo onSetActivePage={handleSetActivePage} />
      )}
      {activePage === "select-rate" && (
        <SelectRate onSetActivePage={handleSetActivePage} />
      )}
      {activePage === "package-details" && (
        <PackageDetailsOverview onSetActivePage={handleSetActivePage} />
      )}
      {activePage === "payment" && (
        <Payment onSetActivePage={handleSetActivePage} />
      )}
    </DashboardLayout>
  );
}

function DeliveryType({
  onSetActivePage,
}: {
  onSetActivePage: (page: string) => void;
}) {
  return (
    <>
      <h1 className="headline text-center">What are you trying to deliver</h1>
      <SelectDeliveryType onSetActivePage={onSetActivePage} />
    </>
  );
}

function Sender({
  onSetActivePage,
}: {
  onSetActivePage: (page: string) => void;
}) {
  return (
    <>
      <h1 className="headline text-center mb-10">Sender’s information</h1>
      <DeliverySourceForm onSetActivePage={onSetActivePage} />
    </>
  );
}
function Receiver({
  onSetActivePage,
}: {
  onSetActivePage: (page: string) => void;
}) {
  return (
    <>
      <h1 className="headline text-center mb-10">Receiver’s information</h1>
      <DeliveryReceiverForm onSetActivePage={onSetActivePage} />
    </>
  );
}

function ParcelInfo({
  onSetActivePage,
}: {
  onSetActivePage: (page: string) => void;
}) {
  return (
    <div className="max-w-5xl md:pr-20 md:pl-10 xl:pl-20 xl:pr-40">
      <h1 className="headline text-center mb-10">Parcel information</h1>
      <ParcelInfoForm onSetActivePage={onSetActivePage} />
    </div>
  );
}

function SelectRate({
  onSetActivePage,
}: {
  onSetActivePage: (page: string) => void;
}) {
  return (
    <>
      <h1 className="headline text-center mb-10">Select Courier</h1>
      <RatesList onSetActivePage={onSetActivePage} />
    </>
  );
}

function PackageDetailsOverview({
  onSetActivePage,
}: {
  onSetActivePage: (page: string) => void;
}) {
  function onSubmit() {
    onSetActivePage("payment");
  }

  const {
    sender,
    receiver,
    parcelDetails: parcel,
    courierDetails,
  } = useCreateDeliveryStore((store) => store);

  return (
    <div className="space-y-8">
      <h1 className="headline text-center mb-10">Package details</h1>

      <PackageDetails
        courierDetails={courierDetails}
        sender={sender}
        receiver={receiver}
        parcel={parcel}
      />
      <ButtonFormSubmit onClick={onSubmit} text="I UNDERSTAND" />
    </div>
  );
}

function Payment({
  onSetActivePage,
}: {
  onSetActivePage: (page: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { createDelivery, isCreating, isError } = useCreateDelivery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [balance, setBalance] = useState<any>({});
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [dialogContent, setDialogContent] = useState("submit");
  const router = useRouter();

  const {
    userId,
    resetDeliveryData,
    courierDetails: { amount },
  } = useCreateDeliveryStore((state) => state);
  console.log(userId);

  const state = getNewDeliveryData();
  console.log(state);

  // TODO: upload packageImage and proofOfPurchase and get back urls

  let timeout: NodeJS.Timeout;

  console.log(balance);
  useEffect(() => {
    async function fetchBalance() {
      setIsLoadingBalance(true);
      const res = await getUser();
      setIsLoadingBalance(false);

      setBalance(res.user.balance);
      console.log(res.user);
    }
    fetchBalance();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("before return...");

    if (balance < amount) {
      setIsDialogOpen(true);
      setDialogContent("deposit");
      return;
    }

    // UPLOADING OF PACKAGE IMAGE AND PROOF OF PURCHASE
    setIsLoading(true);

    const packageImageUrl = await uploadFile(
      base64ToFile(
        state.parcelDetails.packageImage.base64File,
        state.parcelDetails.packageImage.name
      ),
      "package_images",
      "Package"
    );

    const proofOfPurchaseUrl = await uploadFile(
      base64ToFile(
        state.parcelDetails.proofOfPurchase.base64File,
        state.parcelDetails.proofOfPurchase.name
      ),
      "package_proofs",
      "Package proof"
    );

    if (!packageImageUrl || !proofOfPurchaseUrl) {
      // toast.error("Failed to upload files");
      setIsLoading(false);
      return;
    }
    console.log(proofOfPurchaseUrl, packageImageUrl);

    // FORMATTING NEW DELIVERY DATA
    const newDelivery = {
      ...state,
      ...state.sender,
      ...state.receiver,
      ...state.parcelDetails,
    };
    delete newDelivery.sender;
    delete newDelivery.receiver;
    delete newDelivery.parcelDetails;
    newDelivery.packageImage = packageImageUrl;
    newDelivery.proofOfPurchase = proofOfPurchaseUrl;

    console.log(newDelivery);

    try {
      createDelivery(newDelivery);

      if (!isError) {
        resetDeliveryData();
        // timeout = setTimeout(
        //   () => router.push("/user/deliveries/success"),
        //   5000
        // );
        setIsDialogOpen(true);
        setDialogContent("submit");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);

    return () => clearTimeout(timeout);
  }
  function handleDepositRedirect() {
    const redirectPath = "/user/deliveries/register";
    const params = new URLSearchParams({
      activePage: "payment",
      step: "3",
    }).toString();

    const fullRedirect = `${redirectPath}?${params}`;
    const encoded = encodeURIComponent(fullRedirect);

    router.push(`/user/deposit?redirect=${encoded}`);
  }
  if (isLoadingBalance) return <SpinnerFull />;
  return (
    <>
      <h1 className="headline text-center">Payment</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-10">
        <BalanceDisplay />
        <div className="flex flex-col gap-3">
          <Label htmlFor="withdrawAmount">Amount to be paid</Label>
          <Input
            disabled={true}
            // value={getParcelTotalAmount(state.parcelDetails)}
            value={amount}
            className="bg-white h-11"
            id="withdrawAmount"
            type="text"
            placeholder="20, 000"
          />
          <p className="text-sm text-muted">
            This amount will be deducted from your balance
          </p>
        </div>

        <PrivacyPolicyBlock />
        <ButtonFormSubmit
          isLoading={isLoading || isCreating}
          text="I UNDERSTAND"
        />
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {dialogContent === "submit" && (
            <SuccessDialogContent
              title="Payment successful"
              description="Your delivery has been confirmed and your delivery process has started"
              onConfirmSuccess={() => {
                onSetActivePage("success");
                clearTimeout(timeout);
              }}
            />
          )}
          {dialogContent === "deposit" && (
            <div className="space-y-8">
              <DialogTitle className="text-2xl font-bold text-red-600">
                You have insufficient funds
              </DialogTitle>
              <Button
                onClick={handleDepositRedirect}
                className="w-full"
                variant={ButtonVariant.fill}
                text="Go to deposit page"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
