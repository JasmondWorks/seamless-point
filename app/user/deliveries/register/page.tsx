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

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/app/_components/ui/dialog";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";

import {
  base64ToFile,
  cn,
  formatCurrency,
  getNewDeliveryData,
  uploadFile,
} from "@/app/_lib/utils";
import {
  arrangeShipmentPickup,
  createDelivery,
  createShipment,
  createTransaction,
  getUser,
  verifyPayment,
} from "@/app/_lib/actions";
import {
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import Button, { ButtonVariant } from "@/app/_components/Button";

import toast from "react-hot-toast";
import CopyPhoneNumber from "@/app/_components/CopyPhoneNumber";
import Link from "next/link";
import BalanceDisplay from "@/app/_components/BalanceDisplay";
import PaystackButtonWrapper from "@/components/PaystackButtonWrapper";
import {
  AlertCircle,
  ArrowLeftIcon,
  RefreshCcw,
  RefreshCcwIcon,
} from "lucide-react";
import SpinnerFull from "@/app/_components/SpinnerFull";
import Card from "@/app/_components/Card";
import Badge, { BadgeVariant } from "@/app/_components/Badge";
import Spinner from "@/app/_components/Spinner";
import { FiRefreshCcw } from "react-icons/fi";

export type ActivePage =
  | "delivery-type"
  | "sender"
  | "receiver"
  | "parcel-info"
  | "select-rate"
  | "package-details"
  | "payment"
  | "success";

export default function Register() {
  const [activePage, setActivePage] = useState<ActivePage>(
    // searchParams.get("activePage") ||
    // "delivery-type"
    "payment"
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
  onSetActivePage: (page: ActivePage) => void;
}) {
  return (
    <div className="space-y-8 max-w-5xl md:px-5">
      <h1 className="text-2xl lg:text-3xl leading-tight font-bold text-center">
        What are you trying to deliver
      </h1>
      <SelectDeliveryType onSetActivePage={onSetActivePage} />
    </div>
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
  onSetActivePage: (page: ActivePage) => void;
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
  onSetActivePage: (page: ActivePage) => void;
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
  onSetActivePage: (page: ActivePage) => void;
}) {
  return (
    <div className="space-y-8 max-w-5xl md:px-5">
      <h1 className="text-2xl lg:text-3xl leading-tight font-bold text-center">
        Select Courier
      </h1>
      <RatesList onSetActivePage={onSetActivePage} />
    </div>
  );
}

function PackageDetailsOverview({
  onSetActivePage,
}: {
  onSetActivePage: (page: ActivePage) => void;
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
  onSetActivePage: (page: ActivePage) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState<any>({});
  const [activeDialog, setActiveDialog] = useState<"submit" | "deposit">(
    "submit"
  );
  const [isRefreshingBal, setIsRefreshingBal] = useState(false);
  const { balance, email } = user;
  // const amount = 10_021_999;

  const {
    // userId,
    resetDeliveryData,
    replaceState,
    courier: { amount },
  } = useCreateDeliveryStore((state) => state);

  const state = getNewDeliveryData();
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [isShowingAccDetails, setIsShowingAccDetails] = useState(false);
  const [amountIsPaid, setAmountIsPaid] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(100);
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false);

  console.log(user);
  async function fetchUser() {
    setIsLoading(true);
    const res = await getUser();

    setUser(res.user);
    setDepositAmount(Number(amount) - Number(res.user.balance));

    setIsLoading(false);
  }

  async function handleRefreshBal() {
    setIsRefreshingBal(true);

    const res = await getUser();
    setUser(res.user);

    setIsRefreshingBal(false);
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

    console.log(state.parcelDetails);
    console.log("package image url", packageImageUrl);
    const pickupAddressId = state.courier.pickup_address;
    const deliveryAddressId = state.courier.delivery_address;
    const parcelId = state.courier.parcel;
    const rateId = state.courier.rate_id;

    console.log(
      "pickup addr id",
      pickupAddressId,
      "delivery addr id",
      deliveryAddressId,
      "parcel id",
      parcelId,
      "rate id",
      rateId
    );

    const shipmentRes = await createShipment({
      pickupAddressId,
      deliveryAddressId,
      parcelId,
    });
    if (shipmentRes.status === "error") toast.error(shipmentRes.data?.message);

    const shipmentId = shipmentRes.data;

    console.log("shipment id", shipmentId);
    console.log("rate id", rateId);

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

    // replaceState(deliveryPayload);
    // const res = await createDelivery(deliveryPayload);
    // const createdDelivery = res.data;

    // console.log("Created delivery", createdDelivery);

    // if (res.status === "error") toast.error(res.message);
    // // console.log(res);
    // if (res.status === "success") {
    //   // resetDeliveryData();
    //   replaceState(createdDelivery);
    //   // onSetActivePage("success");
    // }

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
  function handleShowAccountDetails() {
    setIsShowingAccDetails(true);
  }
  if (isLoading) return <SpinnerFull />;

  return (
    <div className="space-y-8 max-w-5xl md:px-5">
      <h1 className="text-2xl lg:text-3xl leading-tight font-bold text-center">
        Payment
      </h1>
      <hr />
      <div className="flex justify-end">
        <Button
          onClick={() => onSetActivePage("package-details")}
          isRoundedLarge
          variant={ButtonVariant.outline}
          className="text-sm text-brandSec border-brandSec !h-auto !p-1.5 items-center"
        >
          <ArrowLeftIcon size={20} strokeWidth={2} /> Review package details
        </Button>
      </div>
      {!isShowingAccDetails && (
        <>
          <form onSubmit={onSubmit} className="flex flex-col gap-y-10">
            <Card className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr] items-center gap-8">
              <div className="space-y-3 flex flex-col items-center">
                <p>
                  <strong>Total Amount</strong>
                </p>
                <div>
                  <Badge
                    variant={BadgeVariant.orange}
                    className="!text-3xl font-bold text-opacity-85"
                  >
                    {formatCurrency(amount)}
                  </Badge>
                </div>
              </div>
              <div className="hidden md:block border border-l-[1px] h-full opacity-60"></div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted font-medium">
                    Shipping Charge
                  </span>
                  <strong>{formatCurrency(amount)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted font-medium">Insurance</span>
                  <strong>{formatCurrency(0)}</strong>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-muted font-medium">Total</span>
                  <strong>{formatCurrency(amount)}</strong>
                </div>
              </div>
            </Card>
            <div className="grid lg:grid-cols-2 gap-8 gap-y-5">
              {/* <div className="w-full sm:w-fit sm:min-w-[300px] md:min-w-[400px]"> */}
              <Card className={cn("text-neutral-700 relative !p-0")}>
                <div
                  className="p-5 space-y-5"
                  style={{
                    background:
                      "url('/assets/images/naira-illustration.png') no-repeat right center/contain",
                  }}
                >
                  <div className="flex gap-3 items-center">
                    <h3 className="leading-none text-sm font-medium text-muted">
                      Balance
                    </h3>
                    <button onClick={handleRefreshBal} type="button">
                      <FiRefreshCcw
                        strokeWidth="2"
                        size={30}
                        className="p-1.5 text-brandSec border border-brandSec rounded-md text-opacity-80"
                      />
                    </button>
                    <Dialog
                      open={isTopUpDialogOpen}
                      onOpenChange={setIsTopUpDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant={ButtonVariant.fill}
                          isRoundedLarge
                          className="!h-auto !p-3 !py-2 text-brandSec border-brandSec text-xs"
                          disabled={isRefreshingBal}
                          type="button"
                        >
                          {isRefreshingBal ? "Refreshing" : "Top Up"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="text-left space-y-3">
                        <DialogHeader>
                          <DialogTitle asChild>
                            <h3 className="text-xl font-bold">Amount</h3>
                          </DialogTitle>
                          <DialogDescription className="text-opacity-75">
                            Enter the amount to top up with
                          </DialogDescription>
                        </DialogHeader>
                        <Input
                          value={topUpAmount}
                          onChange={(e) =>
                            setTopUpAmount(Number(e.target.value))
                          }
                        />
                        <DialogFooter>
                          <Button
                            onClick={() => {
                              if (topUpAmount < 100)
                                toast.error(
                                  "Top Up amount must be at least " +
                                    formatCurrency(100)
                                );

                              setIsTopUpDialogOpen(false);

                              return;
                            }}
                            variant={ButtonVariant.fill}
                            isRoundedLarge
                            type="button"
                          >
                            <PaystackButtonWrapper
                              onSuccess={async (el) => {
                                console.log(el);

                                toast.success(
                                  "Successfully paid " +
                                    formatCurrency(topUpAmount)
                                );

                                setIsLoading(true);

                                const res = await createTransaction({
                                  amount: topUpAmount,
                                  type: "deposit",
                                  reference: el.reference,
                                });

                                if (res.status === "success") {
                                  toast.success(
                                    "Successfully deposited " +
                                      formatCurrency(topUpAmount) +
                                      " into your wallet"
                                  );
                                }

                                fetchUser();
                                setIsLoading(false);
                              }}
                              amount={topUpAmount}
                              email={email}
                              text="Top Up"
                            />
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex gap-4 items-center">
                    <p className="text-xl font-bold leading-none whitespace-normal">
                      {formatCurrency(balance)}
                    </p>
                    {Number(amount) > Number(balance) && (
                      <Badge
                        className="border border-red-200 !text-xs italic"
                        variant={BadgeVariant.red}
                      >
                        Insufficient balance
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
              <Card className="space-y-3">
                <p className="font-semibold text-sm">
                  Want to pay directly with bank transfer instead?
                </p>
                <div>
                  <Button
                    onClick={handleShowAccountDetails}
                    variant={ButtonVariant.outline}
                    className="!text-[var(--clr-brand-sec)] !border-[var(--clr-brand-sec)] !text-sm !h-auto !p-2"
                  >
                    Pay with bank transfer
                  </Button>
                </div>
              </Card>
            </div>
            <hr />
            {/* <div className="flex flex-col gap-3">
              <Label htmlFor="withdrawAmount">Amount to be paid</Label>
              <Input
                disabled={true}
                value={amount}
                className="bg-white h-11 font-bold"
                id="withdrawAmount"
                type="text"
                placeholder="20, 000"
              />
              <p className="text-sm text-muted">
                This amount will be deducted from your balance
              </p>
            </div> */}
            <PrivacyPolicyBlock />
            <div className="flex gap-4 justify-end">
              <Button
                onClick={() => onSetActivePage("package-details")}
                variant={ButtonVariant.fill}
                className="!bg-[#fde9d7] !text-brandSec"
                text="Previous"
                isRoundedLarge
              />
              <Button
                disabled={isSubmitting || Number(balance) < Number(amount)}
                isLoading={isSubmitting}
                type="submit"
                variant={ButtonVariant.fill}
                className="!text-white !bg-brandSec"
                isRoundedLarge
              >
                {!isSubmitting && "Finish creating shipment"}
                {isSubmitting && "Arranging shipment"}
              </Button>
              {/* {Number(balance) < Number(amount) ? (
                <Button
                  type="button"
                  onClick={handleDepositDialog}
                  variant={ButtonVariant.fill}
                  className="!text-white !bg-red-500 flex items-center gap-2"
                  isRoundedLarge
                >
                  <AlertCircle />
                  <span>Top-up Wallet</span>
                </Button>
              ) : (
                <Button
                  disabled={isSubmitting || Number(balance) < Number(amount)}
                  isLoading={isSubmitting}
                  type="submit"
                  variant={ButtonVariant.fill}
                  className="!text-white !bg-brandSec"
                  isRoundedLarge
                >
                  {!isSubmitting && "Finish creating shipment"}
                  {isSubmitting && "Arranging shipment"}
                </Button>
              )} */}
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
                    // onClick={() => setIsDialogOpen(false)}
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
      )}
      {isShowingAccDetails && (
        <div className="space-y-8">
          <div className="flex flex-col gap-3">
            <Label htmlFor="withdrawAmount">Amount to be paid</Label>
            <Input
              disabled={true}
              value={amount}
              className="bg-white h-11 font-bold"
              id="withdrawAmount"
              type="text"
              placeholder="20, 000"
            />
          </div>
          <p className="text-sm">
            <strong>
              Initiate the payment by clicking on the button below
            </strong>
          </p>
          {/* <Card className="gap-3 flex flex-col mb-5">
            <h3 className="font-bold text-lg">Corporate account details</h3>
            <hr />
            <div className="flex items-center gap-5">
              <img
                className="h-20"
                src="/assets/images/access-logo.png"
                alt="Access bank logo"
              />
              <div className="gap-3 flex flex-col">
                <span className="text-4xl font-bold">1927670372</span>
                <span className="text-sm font-semibold">
                  SeamlessPoints Technology Limited (Access Bank)
                </span>
              </div>
            </div>
          </Card> */}
          {/* <p className="text-sm">
            <strong>
              Successfully made the transfer? Click on the verify button below
            </strong>
          </p> */}
          <div className="flex justify-end gap-5">
            <Button
              onClick={() => setIsShowingAccDetails(false)}
              variant={ButtonVariant.fill}
              className="!bg-[#fde9d7] !text-brandSec"
              text="Back"
              isRoundedLarge
            />

            <Button variant={ButtonVariant.fill}>
              <PaystackButtonWrapper
                email={user.email}
                amount={amount}
                channels={["bank_transfer"]}
              />
            </Button>
          </div>
        </div>
      )}
    </div>
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
