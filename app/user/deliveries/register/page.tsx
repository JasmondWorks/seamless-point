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
  getUser,
} from "@/app/_lib/actions";
import SpinnerFull from "@/app/_components/SpinnerFull";
import { DialogTitle } from "@radix-ui/react-dialog";
import Button, { ButtonVariant } from "@/app/_components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import BalanceDisplayClient from "@/app/_components/BalanceDisplayClient";
import Spinner from "@/app/_components/Spinner";
import toast from "react-hot-toast";
import CopyPhoneNumber from "@/app/_components/CopyPhoneNumber";
import Link from "next/link";

export default function Register() {
  const searchParams = useSearchParams();

  const [activePage, setActivePage] = useState(
    searchParams.get("activePage") || "parcel-info"
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
      {activePage === "success" && <Success />}
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
    <>
      <h1 className="headline text-center mb-10">Parcel information</h1>
      <ParcelInfoForm onSetActivePage={onSetActivePage} />
    </>
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
  // const { createDelivery, isCreating, isError } = useCreateDelivery();
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [balance, setBalance] = useState<any>({});
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [dialogContent, setDialogContent] = useState("submit");
  const router = useRouter();

  const {
    userId,
    resetDeliveryData,
    replaceState,
    courierDetails: { amount },
  } = useCreateDeliveryStore((state) => state);

  const state = getNewDeliveryData();

  // TODO: upload packageImage and proofOfPurchase and get back urls

  let timeout: NodeJS.Timeout;

  useEffect(() => {
    async function fetchBalance() {
      setIsLoadingBalance(true);
      const res = await getUser();
      setIsLoadingBalance(false);

      setBalance(res.user.balance);
    }
    fetchBalance();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (balance < amount) {
      setIsDialogOpen(true);
      setDialogContent("deposit");
      return;
    }

    // UPLOADING OF PACKAGE IMAGE AND PROOF OF PURCHASE
    setIsLoading(true);

    const packageImageUrl = await uploadFile(
      base64ToFile(
        state.parcelDetails.packageImage!.base64File,
        state.parcelDetails.packageImage!.name
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
      return;
    }

    const pickupAddressId = state.courier.pickup_address;
    const deliveryAddressId = state.courier.delivery_address;
    const parcelId = state.courier.parcel;
    const rateId = state.courier.rate_id;

    const shipmentRes = await createShipment({
      pickupAddressId,
      deliveryAddressId,
      parcelId,
    });
    if (shipmentRes.status === "error") toast.error(shipmentRes.data.message);

    const shipmentId = shipmentRes.data;

    const pickupRes = await arrangeShipmentPickup({ rateId, shipmentId });

    console.log(pickupRes.data);

    const { courier, dispatch, ...deliveryPayload } = {
      ...state,
      parcelDetails: {
        ...state.parcelDetails,
        packageImage: packageImageUrl,
        proofOfPurchaseImage: proofOfPurchaseUrl,
      },
      courierDetails: { ...state.courierDetails, ...pickupRes.data },
    };
    delete deliveryPayload.parcelDetails.proofOfPurchase;

    console.log(deliveryPayload);
    const mockNewDeliveryData = {
      deliveryType: "regular-items",
      sender: {
        firstName: "Obafemi",
        lastName: "Olorede",
        street: "10, DA Street, Shagari Estate, Ipaja, Lagos, Nigeria.",
        aptUnit: "135",
        state: "Lagos",
        country: "NG",
        city: "Alimosho",
        postCode: "100278",
        email: "obafemilared@gmail.com",
        phoneNumber: "+2348115543766",
      },
      receiver: {
        toFirstName: "Olaoluwa",
        toLastName: "Olorede",
        toStreet: "8, Aduni Street, Yaba",
        toAptUnit: "A",
        toState: "Lagos",
        toCountry: "NG",
        toCity: "Yaba",
        toPostCode: "100278",
        toEmail: "olaoluwaolorede8@gmail.com",
        toPhoneNumber: "+2348123456789",
      },
      parcelDetails: {
        packagingType: "box",
        currency: "NGN",
        packageImage:
          "https://enewerspynkvmaxulbhv.supabase.co/storage/v1/object/public/package_images/6815fd24bd5d56162402045c/Package.jpg",
        parcelItems: [
          {
            name: "New beautiful item",
            description: "Ooin!",
            weight: 5,
            quantity: 5,
            length: 5,
            width: 5,
            height: 5,
            type: "document",
            id: "70440e77-1d30-4d30-a212-83825bab855d",
          },
          {
            name: "new new new",
            description: "kadf;kdkfj",
            weight: 5,
            quantity: 5,
            length: 8,
            width: 3,
            height: 4,
            type: "document",
            id: "41210317-6a56-4111-969d-4b430aae21e8",
          },
          {
            name: "new new new new",
            description: "asjfk;afjkd;jkj",
            weight: 9,
            quantity: 2,
            length: 3,
            width: 38,
            height: 9,
            type: "document",
            id: "1c58dbc1-e7e6-4060-8a96-33fe18386847",
          },
        ],
        proofOfPurchaseImage:
          "https://enewerspynkvmaxulbhv.supabase.co/storage/v1/object/public/package_proofs/6815fd24bd5d56162402045c/Package%20proof.pdf",
      },
      courierDetails: {
        amount: 56656.27,
        courierName: "DHL Express",
        courierLogo:
          "https://ucarecdn.com/dcdd8109-af8c-4057-8104-192be821dd6e/download4.png",
        rateId: "RT-CYSVUJ2QGY14BJFR",
        trackingUrl:
          "https://testing.terminal.africa/track/SH-TUMXX6PPYDP998EK",
        shipmentId: "SH-TUMXX6PPYDP998EK",
        reference: "45832F48H",
        trackingNumber: "128526F8ABD",
      },
      userId: "6815fd24bd5d56162402045c",
    };
    replaceState(deliveryPayload);
    const res = await createDelivery(deliveryPayload);
    const createdDelivery = res.data;

    console.log("Created delivery", createdDelivery);

    setIsCreating(false);

    onSetActivePage("success");
    // if (!isError) {
    //   resetDeliveryData();
    //   // timeout = setTimeout(
    //   //   () => router.push("/user/deliveries/success"),
    //   //   5000
    //   // );
    //   setIsDialogOpen(true);
    //   setDialogContent("submit");
    // }

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
        <BalanceDisplayClient balance={Number(balance)} />
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
        <ButtonFormSubmit
          disabled={isLoading || isCreating}
          text={isLoading ? <Spinner color="text" /> : "I UNDERSTAND"}
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

function Success() {
  const resetDeliveryData = useCreateDeliveryStore(
    (store) => store.resetDeliveryData
  );
  const state = getNewDeliveryData();
  const { trackingNumber, trackingUrl } = state.courierDetails;

  console.log(state);

  // useEffect(() => resetDeliveryData(), []);

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
