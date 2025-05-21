import Badge, { BadgeVariant } from "@/app/_components/Badge";
import Button, { ButtonVariant } from "@/app/_components/Button";
import { Button as Button2 } from "@/app/_components/ui/button";
import CourierDetails from "@/app/_components/CourierDetails";
import CountdownTimer from "@/app/_components/CountdownTimer";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getRates } from "@/app/_lib/actions";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import { showToast } from "@/app/_lib/toast";
import { formatCurrency } from "@/app/_lib/utils";

const RatesList = ({
  onSetActivePage,
}: {
  onSetActivePage: (page: string) => void;
}) => {
  const [couriers, setCouriers] = useState([]);
  const courier = useCreateDeliveryStore((store) => store.courier);
  const {
    receiver,
    sender,
    parcelDetails,
    courierDetails,
    onSetCourierDetails,
  } = useCreateDeliveryStore((store) => store);
  const [selectedCourier, setSelectedCourier] = useState<any>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSelectCourier = useCreateDeliveryStore(
    (store) => store.onSelectCourier
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  let timeout: any;

  useEffect(() => {
    fetchRates();

    showToast("Amount may change from time to time", "info");
  }, []);
  useEffect(() => {
    const foundCourier =
      courier !== undefined &&
      couriers?.find(
        (c: any) =>
          c.carrier_name === courier?.carrier_name &&
          c.carrier_rate_description === courier?.carrier_rate_description
      );
    setSelectedCourier(foundCourier);
  }, [couriers]);

  useEffect(() => {
    clearTimeout(timeout);
  }, [isDialogOpen]);

  async function fetchRates() {
    const pickupAddress = {
      country: sender!.country,
      state: sender!.state,
      city: sender!.city,
      zip: sender!.postCode,
      phone: sender!.phoneNumber,
      line1: sender!.street!.slice(0, 45),
      email: sender!.email,
      first_name: sender!.firstName,
      last_name: sender!.lastName,
    };
    const deliveryAddress = {
      country: receiver!.toCountry,
      state: receiver!.toState,
      city: receiver!.toCity,
      zip: receiver!.toPostCode,
      phone: receiver!.toPhoneNumber,
      line1: receiver!.toStreet!.slice(0, 45),
      email: receiver!.toEmail,
      first_name: receiver!.toFirstName,
      last_name: receiver!.toLastName,
    };

    const biggestLength = parcelDetails!.parcelItems.reduce(
      (biggest, item) =>
        item.length > biggest ? (biggest = item.length) : biggest,
      parcelDetails!.parcelItems[0].length
    );
    const biggestWidth = parcelDetails!.parcelItems.reduce(
      (biggest, item) =>
        item.width > biggest ? (biggest = item.width) : biggest,
      parcelDetails!.parcelItems[0].width
    );
    const biggestHeight = parcelDetails!.parcelItems.reduce(
      (biggest, item) =>
        item.height > biggest ? (biggest = item.height) : biggest,
      parcelDetails!.parcelItems[0].height
    );

    const packagingDetails = {
      length: biggestLength,
      width: biggestWidth,
      height: biggestHeight,
      name: parcelDetails?.packagingType,
      type: parcelDetails?.packagingType.toLowerCase(),
      weight: 0.25,
      size_unit: "cm",
      weight_unit: "kg",
    };
    const parcel = {
      description: parcelDetails!.parcelItems
        .map((parcel) => parcel.description)
        .join(", "),
      items: parcelDetails!.parcelItems.map((item) => ({
        description: item.description,
        name: item.name,
        weight: item.weight,
        currency: parcelDetails!.currency,
        quantity: item.quantity,
        value: 2000,
      })),
      weight_unit: "kg",
    };
    const currency = parcelDetails!.currency;

    setError("");
    setIsLoading(true);
    const res = await getRates({
      pickupAddress,
      deliveryAddress,
      packagingDetails,
      parcel,
      currency,
    });
    setIsLoading(false);

    if (res.status === "error") {
      setError(res.message);
      toast.error(res.message);
    }
    setCouriers(res.data);
  }

  function handleSelectCourier(courier: any) {
    setSelectedCourier((prev: any) =>
      prev?.carrier_name === courier.carrier_name &&
      prev?.carrier_rate_description === courier.carrier_rate_description
        ? null
        : courier
    );
  }

  function onSubmit() {
    if (!selectedCourier) return toast.error("You haven't selected a courier");

    onSelectCourier(selectedCourier);
    console.log(selectedCourier);

    const courierDetails = {
      amount: selectedCourier.amount,
      courierName: selectedCourier.carrier_name,
      courierLogo: selectedCourier.carrier_logo,
      rateId: selectedCourier.rate_id,
    };
    onSetCourierDetails(courierDetails);
    setIsDialogOpen(true);

    timeout = setTimeout(() => onSetActivePage("package-details"), 5000);
  }
  return (
    <>
      {error && (
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-xl font-bold">{error}</h3>
          <Button2
            variant="outline"
            className="border border-brandSec font-bold"
            onClick={fetchRates}
          >
            Get rates
          </Button2>
        </div>
      )}
      <div className="overflow-x-auto space-y-5">
        {isLoading && <DataFetchSpinner />}
        {!isLoading &&
          couriers?.length === 0 &&
          "No rates available at this time"}
        {!isLoading &&
          couriers?.length > 0 &&
          couriers?.map((courier: any) => (
            <CourierDetails
              key={courier._id}
              courier={courier}
              selectedCourier={selectedCourier}
              onSelectCourier={handleSelectCourier}
            />
          ))}
      </div>
      <div className="flex gap-4">
        <Button
          variant={ButtonVariant.fill}
          className="!bg-[#fde9d7] !text-brandSec"
          text="Previous"
          isRoundedLarge
        />
        {
          <Button
            disabled={Boolean(error)}
            onClick={onSubmit}
            variant={ButtonVariant.fill}
            className="!text-white !bg-brandSec"
            text="Continue"
            isRoundedLarge
          />
        }
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <div className="space-y-10">
            <DialogTitle>
              <div className="flex items-center gap-5">
                <Image
                  className="h-16 w-fit object-contain"
                  src={selectedCourier?.carrier_logo}
                  alt="logo"
                  width={200}
                  height={200}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {selectedCourier?.carrier_name}
                  </span>
                  <span className="text-2xl">
                    {selectedCourier?.carrier_rate_description}
                  </span>
                </div>
              </div>
            </DialogTitle>
            <div className="flex flex-col gap-8 sm:flex-row justify-between sm:items-center">
              <span className="text-4xl font-semibold">
                {formatCurrency(selectedCourier?.amount)}
              </span>
            </div>

            <span className="absolute bottom-3 right-3">
              <CountdownTimer initialSeconds={5} />
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RatesList;
