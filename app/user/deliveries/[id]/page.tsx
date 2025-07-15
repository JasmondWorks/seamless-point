"use client";

import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import DeliveryStatuses from "@/app/_components/DeliveryStatuses";
import useDelivery from "@/app/_hooks/deliveries/useDelivery";

export default function Delivery({
  params: { id },
}: {
  params: { id: string };
}) {
  const { delivery, isLoading, isError } = useDelivery(id);

  console.log(delivery);

  if (isLoading) return <DataFetchSpinner />;

  // function getDeliveryStep(status: string) {
  //   let step;

  //   switch(status) {
  //     case 'unconfirmed':
  //       step = 0;
  //       break;
  //     case 'pending':
  //       step = 1;
  //       break;
  //     case 'assigned'
  //   }
  // }

  return (
    <div>
      <DeliveryStatuses />
    </div>
  );
}
