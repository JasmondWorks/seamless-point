import Card from "@/app/_components/Card";
import React from "react";
import PackageDetails from "@/app/_components/PackageDetails";
import { fetchDelivery } from "@/app/_lib/actions";
import { getPackageSenderReceiver, getParcelDetails } from "@/app/_lib/utils";
import DeliveryStatuses from "@/app/_components/DeliveryStatuses";
import Button, { ButtonVariant } from "@/app/_components/Button";

export default async function ShipmentDetails({
  params,
}: {
  params: { trackingId: string };
}) {
  const currentStep = 2;
  const { trackingId } = params;
  console.log(trackingId);

  const shipment = await fetchDelivery(trackingId);

  const sender = getPackageSenderReceiver(shipment.data.delivery);
  const receiver = getPackageSenderReceiver(shipment.data.delivery, "to");
  const parcel = getParcelDetails(shipment.data.delivery);

  return (
    <>
      <h1 className="headline">Shipment details</h1>
      <div className="space-y-8">
        <PackageDetails
          sender={sender}
          receiver={receiver}
          parcel={parcel}
          delivery={shipment.data.delivery}
        />
        <div>
          <h3 className="text-xl mb-3 font-bold">Package Timeline</h3>
          {shipment.data.delivery.status === "unconfirmed" && (
            <div>
              <p className="mb-5">This shipment is not approved</p>
              <Button variant={ButtonVariant.fill}>Approve now</Button>
            </div>
          )}
          {shipment.data.delivery.status !== "unconfirmed" && (
            <Card className="p-8 !rounded-3xl">
              <div className="flex gap-10 justify-between text-center  overflow-x-auto">
                <DeliveryStatuses direction="horizontal" />
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
