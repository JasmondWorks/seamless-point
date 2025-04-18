import { dispatches } from "@/app/_lib/constants";
import {
  formatCurrency,
  getParcelTotalAmount,
  getParcelTotalWeight,
} from "@/app/_lib/utils";
import React from "react";

export default function PackageDetails({
  sender,
  receiver,
  parcel,
  delivery,
}: any) {
  console.log(parcel);

  const dispatch = dispatches.find(
    (d) => d.name.toLowerCase() === delivery?.courier
  )?.name;

  console.log(dispatch);
  console.log("Delivery:", delivery);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        <div className="sm:max-w-lg space-y-3 flex-1">
          <h3 className="text-xl font-bold leading-tight text-gray-900">
            Senders details
          </h3>
          <div className="space-y-6 rounded-3xl p-3 bg-white border border-neutral-300">
            <div className="flex gap-6 flex-wrap justify-between">
              <div className="space-y-1">
                <p className="font-bold">Name</p>
                <p className="text-muted">
                  {`${sender?.firstName} ${sender?.lastName}` || "John doe"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold">Email</p>
                <p className="text-muted">
                  {sender?.email || "abcde@example.com"}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-bold">Phone Number</p>
              <p className="text-muted">
                {sender?.phoneNumber || "08012345678"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-bold">Sender's Address</p>
              <p className="text-muted">
                {`${sender?.aptUnit} ${sender?.street}, ${sender?.city}, ${sender?.state}` ||
                  "Sender's Address"}
              </p>
            </div>
          </div>
        </div>
        <div className="sm:max-w-lg space-y-3 flex-1">
          <h3 className="text-xl font-bold leading-tight text-gray-900">
            Receiver's details
          </h3>
          <div className="space-y-6 rounded-3xl p-3 bg-white border border-neutral-300">
            <div className="flex gap-6 flex-wrap justify-between">
              <div className="space-y-1">
                <p className="font-bold">Name</p>
                <p className="text-muted">
                  {`${receiver?.toFirstName} ${receiver?.toLastName}` ||
                    "John doe"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold">Email</p>
                <p className="text-muted">
                  {receiver?.toEmail || "abcde@example.com"}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-bold">Phone Number</p>
              <p className="text-muted">
                {" "}
                {receiver?.toPhoneNumber || "08012345678"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-bold">Sender Address</p>
              <p className="text-muted">
                {`${receiver?.toAptUnit} ${receiver?.toStreet}, ${receiver?.toCity}, ${receiver?.toState}` ||
                  "Receiver's Address"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 flex-1">
        <h3 className="text-xl font-bold leading-tight text-gray-900">
          Package details
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(220px, 1fr))",
          }}
          className="whitespace-pre-wrap rounded-3xl p-3 bg-white border border-neutral-300 gap-6 no-scrollbar overflow-x-auto"
        >
          <div className="space-y-1">
            <p className="font-bold">Amount</p>
            <p className="text-muted">
              {formatCurrency(getParcelTotalAmount(parcel))}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Description</p>
            {parcel?.parcelItems.map((item: any) => (
              <p key={item?.name} className="text-muted">
                {item?.name}
              </p>
            ))}
          </div>
          <div className="space-y-1">
            <p className="font-bold">Payment Method</p>
            <p className="text-muted">
              {/* {parcel?.paymentMethod || "N/A"} */}
              N/A
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Payment Status</p>
            <p className="text-muted">
              {/* {parcel?.paymentStatus || "N/A"} */}
              N/A
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Item value</p>
            {parcel?.parcelItems.map((item: any) => (
              <p key={item?.id} className="text-muted">
                {item?.value}
              </p>
            ))}
          </div>
          <div className="space-y-1">
            <p className="font-bold">Weight</p>
            <p className="text-muted">{getParcelTotalWeight(parcel)}kg</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Courier</p>
            {/* <p className="text-muted">{store.courier?.name || "Courier"}</p> */}
            <p className="text-muted">
              {
                dispatches.find(
                  (d) => d.name.toLowerCase() === delivery?.courier
                )?.name
              }
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Approved by</p>
            <p className="text-muted">
              {delivery?.deliveryStatus === "pending"
                ? "Not approved yet"
                : delivery?.approvedBy}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Length</p>
            <p className="text-muted">20cm</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Width</p>
            <p className="text-muted">30cm</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Height</p>
            <p className="text-muted">40cm</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Quantity</p>
            <p className="text-muted">
              {parcel?.parcelItems.reduce(
                (acc: number, item: any) => acc + item?.quantity,
                0
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
