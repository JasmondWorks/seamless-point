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
import { createAddress, getRates } from "@/app/_lib/actions";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import { showToast } from "@/app/_lib/toast";
import { formatCurrency } from "@/app/_lib/utils";
import { RefreshCcw } from "lucide-react";
import { Select } from "@/app/_components/ui/select";
import CustomFormField, {
  FormFieldType,
} from "@/app/_components/CustomFormField";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ActivePage } from "@/app/user/deliveries/register/page";

const RatesList = ({
  onSetActivePage,
}: {
  onSetActivePage: (page: ActivePage) => void;
}) => {
  const [couriers, setCouriers] = useState([]);

  const store = useCreateDeliveryStore((store) => store);

  const {
    courier,
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
  const [sortBy, setSortBy] = useState<
    "+price" | "-price" | "fastest" | "clear" | string
  >("fastest");

  let filteredCouriers = couriers;

  if (sortBy === "+price")
    filteredCouriers = couriers?.sort((a: any, b: any) => a.amount - b.amount);
  else if (sortBy === "-price")
    filteredCouriers = couriers?.sort((a: any, b: any) => b.amount - a.amount);
  else if (sortBy === "fastest")
    filteredCouriers = couriers?.sort(
      (a: any, b: any) => a.delivery_eta - b.delivery_eta
    );
  else if (sortBy === "clear") filteredCouriers = couriers;

  useEffect(() => {
    fetchRates();
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

  console.log(couriers);

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

    console.log(parcelDetails);

    const parcel = {
      description: parcelDetails!.parcelItems
        .map((parcel) => parcel.description)
        .join(", "),
      items: parcelDetails!.parcelItems.map((item) => ({
        ...item,
        name: item.description,
        currency: parcelDetails!.currency,
        // value: 2000,
      })),
      weight_unit: "kg",
    };
    const currency = parcelDetails!.currency;

    setError("");
    setIsLoading(true);
    const res = await getRates({
      pickupAddress,
      deliveryAddress,
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
    setSelectedCourier(courier);
  }

  function onSubmit() {
    if (!selectedCourier) return toast.error("You haven't selected a courier");

    onSelectCourier(selectedCourier);

    const courierDetails = {
      amount: selectedCourier.amount,
      courierName: selectedCourier.carrier_name,
      courierLogo: selectedCourier.carrier_logo,
      rateId: selectedCourier.rate_id,
    };
    onSetCourierDetails(courierDetails);

    onSetActivePage("package-details");
  }

  if (isLoading) return <DataFetchSpinner />;

  return (
    <>
      {error && (
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-xl font-bold">{error}</h3>
          <Button
            variant={ButtonVariant.outline}
            className="border border-brandSec text-brandSec !p-2 !h-auto font-bold text-sm"
            onClick={fetchRates}
          >
            Get rates
          </Button>
        </div>
      )}
      {!error && (
        <div className="flex justify-end gap-5">
          <Button
            isRoundedLarge
            onClick={fetchRates}
            variant={ButtonVariant.fill}
            className="flex items-center gap-2 text-sm"
          >
            Refresh <RefreshCcw strokeWidth={3} size={21} />
          </Button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="font-[inherit] text-[inherit] border rounded-lg text-sm"
          >
            <option value="-price">Sort by: Highest Price</option>
            <option value="+price">Sort by: Lowest Price</option>
            <option value="fastest">Sort by: Fastest</option>
          </select>
        </div>
      )}
      <div className="space-y-5">
        {!isLoading &&
          filteredCouriers?.length === 0 &&
          "No rates available at this time"}
        {!isLoading &&
          filteredCouriers?.length > 0 &&
          filteredCouriers?.map((courier: any) => (
            <CourierDetails
              key={courier._id}
              courier={courier}
              selectedCourier={selectedCourier}
              onSelectCourier={handleSelectCourier}
            />
          ))}
      </div>
      <div className="flex gap-4 justify-end">
        <Button
          onClick={() => onSetActivePage("parcel-info")}
          variant={ButtonVariant.fill}
          className="!bg-[#fde9d7] !text-brandSec"
          text="Previous"
          isRoundedLarge
        />

        <Button
          disabled={Boolean(error) || !selectedCourier}
          onClick={() => setIsDialogOpen(true)}
          variant={ButtonVariant.fill}
          className="!text-white !bg-brandSec"
          text="Continue"
          isRoundedLarge
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogDescription></DialogDescription>
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

            <Button
              onClick={onSubmit}
              variant={ButtonVariant.fill}
              className="!text-white !bg-brandSec w-full"
              text="Proceed"
              isRoundedLarge
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RatesList;
