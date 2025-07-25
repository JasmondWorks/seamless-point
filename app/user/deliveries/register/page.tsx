"use client";

import DashboardLayout from "@/app/_components/DashboardLayout";
import DeliveryReceiverForm from "@/app/_components/DeliveryReceiverForm";
import DeliverySourceForm from "@/app/_components/DeliverySourceForm";
import SelectDeliveryType from "@/app/_components/SelectDeliveryType";
import ParcelInfoForm from "@/app/_components/ParcelInfoForm";
import { useEffect, useState } from "react";
import RatesList from "@/app/_components/RatesList";

import PackageDetails from "@/app/_components/PackageDetails";

import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";

import PrivacyPolicyBlock from "@/app/_components/PrivacyPolicyBlock";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";

import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";

import { base64ToFile, getNewDeliveryData, uploadFile } from "@/app/_lib/utils";
import {
  arrangeShipmentPickup,
  createDelivery,
  createShipment,
  createTransaction,
  getUser,
  verifyPayment,
} from "@/app/_lib/actions";
import { DialogTitle } from "@radix-ui/react-dialog";
import Button, { ButtonVariant } from "@/app/_components/Button";

import toast from "react-hot-toast";
import CopyPhoneNumber from "@/app/_components/CopyPhoneNumber";
import Link from "next/link";
import BalanceDisplay from "@/app/_components/BalanceDisplay";
import PaystackButtonWrapper from "@/components/PaystackButtonWrapper";
import { AlertCircle } from "lucide-react";
import SpinnerFull from "@/app/_components/SpinnerFull";

type ActivePage =
  | "delivery-type"
  | "sender"
  | "receiver"
  | "parcel-info"
  | "select-rate"
  | "package-details"
  | "payment"
  | "success";

export default function Register() {
  // const searchParams = useSearchParams();

  const [activePage, setActivePage] = useState<ActivePage>(
    // searchParams.get("activePage") ||
    "delivery-type"
  );

  function handleSetActivePage(page: ActivePage) {
    setActivePage(page);
  }

  return (
    <DashboardLayout isContained={false}>
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
      {activePage === "success" && <Success />}
    </DashboardLayout>
  );
}

function DeliveryType({
  onSetActivePage,
}: {
  onSetActivePage: (page: any) => void;
}) {
  return (
    <>
      <h1 className="text-2xl lg:text-3xl leading-tight font-bold text-center">
        What are you trying to deliver
      </h1>
      <SelectDeliveryType onSetActivePage={onSetActivePage} />
    </>
  );
}

function Sender({ onSetActivePage }: { onSetActivePage: (page: any) => void }) {
  return (
    <div className="space-y-8 max-w-5xl md:px-5">
      <h1 className="text-2xl lg:text-3xl leading-tight font-bold text-center">
        Sender’s information
      </h1>

      <DeliverySourceForm onSetActivePage={onSetActivePage} />
    </div>
  );
}
function Receiver({
  onSetActivePage,
}: {
  onSetActivePage: (page: any) => void;
}) {
  return (
    <div className="space-y-8 max-w-5xl md:px-5">
      <h1 className="text-2xl lg:text-3xl leading-tight font-bold text-center">
        Receiver’s information
      </h1>
      <DeliveryReceiverForm onSetActivePage={onSetActivePage} />
    </div>
  );
}

function ParcelInfo({
  onSetActivePage,
}: {
  onSetActivePage: (page: any) => void;
}) {
  return (
    <div className="space-y-8 max-w-5xl md:px-5">
      <h1 className="text-2xl lg:text-3xl leading-tight font-bold text-center">
        Parcel information
      </h1>
      <ParcelInfoForm onSetActivePage={onSetActivePage} />
    </div>
  );
}

function SelectRate({
  onSetActivePage,
}: {
  onSetActivePage: (page: any) => void;
}) {
  return (
    <>
      <h1 className="text-2xl lg:text-3xl leading-tight font-bold text-center">
        Select Courier
      </h1>
      <RatesList onSetActivePage={onSetActivePage} />
    </>
  );
}

function PackageDetailsOverview({
  onSetActivePage,
}: {
  onSetActivePage: (page: any) => void;
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
    <div className="space-y-8 max-w-5xl md:px-5">
      <h1 className="text-2xl lg:text-3xl leading-tight font-bold text-center">
        Package details
      </h1>

      <PackageDetails
        onSetActivePage={onSetActivePage}
        courierDetails={courierDetails}
        sender={sender}
        receiver={receiver}
        parcel={parcel}
      />
      <div className="flex gap-4 justify-end">
        <Button
          onClick={() => onSetActivePage("select-rate")}
          variant={ButtonVariant.fill}
          className="!bg-[#fde9d7] !text-brandSec"
          text="Previous"
          isRoundedLarge
        />

        <Button
          onClick={onSubmit}
          variant={ButtonVariant.fill}
          className="!text-white !bg-brandSec"
          text="Continue"
          isRoundedLarge
        />
      </div>
    </div>
  );
}

function Payment({
  onSetActivePage,
}: {
  onSetActivePage: (page: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState<any>({});
  const [activeDialog, setActiveDialog] = useState<"submit" | "deposit">(
    "submit"
  );
  const { balance, email } = user;
  // const amount = 6_021_999;

  const {
    userId,
    resetDeliveryData,
    replaceState,
    courierDetails: { amount },
  } = useCreateDeliveryStore((state) => state);

  const state = getNewDeliveryData();
  const [depositAmount, setDepositAmount] = useState<number>(0);

  async function fetchUser() {
    setIsLoading(true);
    const res = await getUser();

    setUser(res.user);
    setDepositAmount(Number(amount) - Number(res.user.balance));

    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // const { courier, dispatch, ...deliveryPayload } = {
  //   ...state,
  //   parcelDetails: {
  //     ...state.parcelDetails,
  //   },
  //   courierDetails: { ...state.courierDetails },
  // };

  // console.log("Delivery payload", deliveryPayload);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("submitted!");

    if (balance < amount) return;

    console.log("package image", state.parcelDetails?.packageImage);
    console.log("proof of purchase", state.parcelDetails?.proofOfPurchase);

    // UPLOADING OF PACKAGE IMAGE AND PROOF OF PURCHASE
    setIsSubmitting(true);

    let packageImageUrl, proofOfPurchaseUrl;

    const packageImageFile =
      state.parcelDetails?.packageImage?.base64File &&
      state.parcelDetails?.packageImage?.name
        ? base64ToFile(
            state.parcelDetails.packageImage.base64File,
            state.parcelDetails.packageImage.name
          )
        : undefined;

    if (packageImageFile) {
      packageImageUrl = await uploadFile(
        packageImageFile,
        "package_images",
        "Package"
      );
    }

    const proofOfPurchaseFile =
      state.parcelDetails?.proofOfPurchase?.base64File &&
      state.parcelDetails?.proofOfPurchase?.name
        ? base64ToFile(
            state.parcelDetails.proofOfPurchase.base64File,
            state.parcelDetails.proofOfPurchase.name
          )
        : undefined;

    if (proofOfPurchaseFile) {
      proofOfPurchaseUrl = await uploadFile(
        proofOfPurchaseFile,
        "package_proofs",
        "Package proof"
      );
    }

    if (!packageImageUrl || !proofOfPurchaseUrl) {
      // toast.error("Failed to upload files");
      // return;
    }
    console.log(state.parcelDetails);
    console.log("package image url", packageImageUrl);
    const pickupAddressId = state.courier.pickup_address;
    const deliveryAddressId = state.courier.delivery_address;
    const parcelId = state.courier.parcel;
    const rateId = state.courier.rate_id;

    const shipmentRes = await createShipment({
      pickupAddressId,
      deliveryAddressId,
      parcelId,
    });
    if (shipmentRes.status === "error") toast.error(shipmentRes.data?.message);

    const shipmentId = shipmentRes.data;

    console.log("shipment id", shipmentId);

    const pickupRes = await arrangeShipmentPickup({ rateId, shipmentId });

    console.log("pickup data", pickupRes.data);

    if (pickupRes.status === "error") {
      if (
        pickupRes.message ===
        "Rate has already been used and is no longer valid"
      ) {
        toast.error(`${pickupRes.message}, kindly select a rate again`);
        onSetActivePage("select-rate");
      } else toast.error(pickupRes.message);

      setIsSubmitting(false);
      return;
    }

    const { courier, dispatch, ...deliveryPayload } = {
      ...state,
      parcelDetails: {
        ...state.parcelDetails,
        packageImage: packageImageUrl || "",
        proofOfPurchaseImage: proofOfPurchaseUrl || "",
      },
      courierDetails: {
        ...state.courierDetails,
        ...pickupRes.data,
        shipmentId,
      },
    };
    delete deliveryPayload.parcelDetails.proofOfPurchase;

    console.log(deliveryPayload);

    replaceState(deliveryPayload);
    const res = await createDelivery(deliveryPayload);
    const createdDelivery = res.data;

    console.log("Created delivery", createdDelivery);

    if (res.status === "error") toast.error(res.message);
    // console.log(res);
    if (res.status === "success") {
      // resetDeliveryData();
      replaceState(createdDelivery);
      onSetActivePage("success");
    }

    setIsSubmitting(false);
  }
  async function handleDepositSuccess(res: any) {
    setIsLoading(true);
    console.log(res.reference);

    const verifyRes = await verifyPayment(res.reference);

    console.log(verifyRes);

    if (verifyRes.status === "error") {
      toast.error(verifyRes.message);
      setIsLoading(false);
      return;
    }

    const resTrans = await createTransaction({
      amount: depositAmount,
      type: "deposit",
    });
    console.log(resTrans.data);

    fetchUser();
  }
  function handleDepositDialog() {
    setActiveDialog("deposit");
    setIsDialogOpen(true);
  }

  if (isLoading) return <SpinnerFull />;

  return (
    <>
      <h1 className="text-2xl lg:text-3xl leading-tight font-bold text-center">
        Payment
      </h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-10">
        <div className="w-full sm:w-fit sm:min-w-[300px] md:min-w-[400px]">
          <BalanceDisplay balance={balance} />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="withdrawAmount">Amount to be paid</Label>
          <Input
            disabled={true}
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
        <div className="flex gap-4 justify-end">
          <Button
            onClick={() => onSetActivePage("package-details")}
            variant={ButtonVariant.fill}
            className="!bg-[#fde9d7] !text-brandSec"
            text="Previous"
            isRoundedLarge
          />
          {Number(balance) < Number(amount) ? (
            <Button
              type="button"
              onClick={handleDepositDialog}
              variant={ButtonVariant.fill}
              className="!text-white !bg-red-500 flex items-center gap-2"
              isRoundedLarge
            >
              <AlertCircle />
              <span>Insufficient balance</span>
            </Button>
          ) : (
            <Button
              disabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
              variant={ButtonVariant.fill}
              className="!text-white !bg-brandSec"
              isRoundedLarge
            >
              {!isSubmitting && "Finish creating shipment"}
              {isSubmitting && "Arranging shipment"}
            </Button>
          )}
        </div>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {activeDialog === "submit" && (
            <SuccessDialogContent
              title="Payment successful"
              description="Your delivery has been confirmed and your delivery process has started"
              onConfirmSuccess={() => {
                onSetActivePage("success");
              }}
            />
          )}
          {activeDialog === "deposit" && (
            <div className="space-y-8">
              <DialogTitle className="text-2xl font-bold">
                Deposit now
              </DialogTitle>
              <div className="flex flex-col gap-3">
                <span>Amount</span>
                <Input
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="h-11 bg-white"
                  type="text"
                  placeholder="100NGN"
                />
              </div>
              <Button
                onClick={() => setIsDialogOpen(false)}
                type="button"
                variant={ButtonVariant.fill}
                className="!text-white flex items-center w-full"
                isRoundedLarge
              >
                <PaystackButtonWrapper
                  onSuccess={handleDepositSuccess}
                  amount={depositAmount}
                  email={email}
                />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Success() {
  const resetDeliveryData = useCreateDeliveryStore(
    (store) => store.resetDeliveryData
  );
  const state = getNewDeliveryData();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");

  console.log("state", state);

  useEffect(() => {
    setTrackingNumber(state.courierDetails.trackingNumber);
    setTrackingUrl(state.courierDetails.trackingUrl);
    resetDeliveryData();
  }, []);

  return (
    <div className="h-full grid place-items-center">
      <div className="text-center flex flex-col gap-8 items-center">
        <div>
          <svg
            className="h-60"
            width={241}
            height={252}
            viewBox="0 0 241 252"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_94_2198"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={241}
              height={252}
            >
              <path
                d="M120.5 1L153.331 24.95L193.975 24.875L206.456 63.55L239.381 87.375L226.75 126L239.381 164.625L206.456 188.45L193.975 227.125L153.331 227.05L120.5 251L87.6686 227.05L47.0249 227.125L34.5437 188.45L1.61865 164.625L14.2499 126L1.61865 87.375L34.5437 63.55L47.0249 24.875L87.6686 24.95L120.5 1Z"
                fill="white"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M76.75 126L108 157.25L170.5 94.75"
                stroke="black"
                strokeWidth={10}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </mask>
            <g mask="url(#mask0_94_2198)">
              <path d="M-29.5 -24H270.5V276H-29.5V-24Z" fill="#00A42E" />
            </g>
          </svg>
        </div>
        <p className="subheadline">
          Successful, a rider will soon contact you to pick up your package
        </p>
        <Link
          href={trackingUrl}
          target="_blank"
          className="flex py-3 leading-4 px-6 bg-green-200 rounded-lg text-green-500"
        >
          Track your package here
        </Link>
        <div className="flex flex-col items-start gap-y-1">
          <CopyPhoneNumber text={trackingNumber} />
          <span className="text-sm text-opacity-80">Copy tracking number</span>
        </div>
      </div>
    </div>
  );
}
