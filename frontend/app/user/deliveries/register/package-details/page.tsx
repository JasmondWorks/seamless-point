"use client";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import {
  formatCurrency,
  getNewDeliveryData,
  getParcelTotalAmount,
  getStoreState,
} from "@/app/_lib/utils";
import { useCreateDeliveryStore } from "@/app/_stores/createDeliveryStore";
import { useRouter } from "next/navigation";
import React from "react";

export default function PackageDetailsPage() {
  const router = useRouter();
  function onSubmit() {
    router.push("/user/deliveries/register/payment");
  }

  const sender = useCreateDeliveryStore((store) => store.sender);
  const receiver = useCreateDeliveryStore((store) => store.receiver);
  const store = useCreateDeliveryStore((store) => store);
  const state = getNewDeliveryData();
  console.log(state);

  return (
    <div className="space-y-8">
      <h1 className="headline text-center mb-10">Package details</h1>

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
              {formatCurrency(getParcelTotalAmount(store.parcelDetails))}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Description</p>
            {store.parcelDetails?.parcelItems.map((item) => (
              <p key={item?.name} className="text-muted">
                {item?.name}
              </p>
            ))}
          </div>
          <div className="space-y-1">
            <p className="font-bold">Payment Method</p>
            <p className="text-muted">
              {store.parcelDetails?.paymentMethod || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Payment Status</p>
            <p className="text-muted">
              {store.parcelDetails?.paymentStatus || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Item value</p>
            {store.parcelDetails?.parcelItems.map((item) => (
              <p key={item?.id} className="text-muted">
                {item?.value}
              </p>
            ))}
          </div>
          <div className="space-y-1">
            <p className="font-bold">Weight</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Courier</p>
            <p className="text-muted">{store.courier?.name || "Courier"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Approved by</p>
            <p className="text-muted">Boe</p>
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
              {store.parcelDetails?.parcelItems.reduce(
                (acc, item) => acc + item?.quantity,
                0
              )}
            </p>
          </div>
        </div>
      </div>
      <ButtonFormSubmit onClick={onSubmit} text="I UNDERSTAND" />
    </div>
  );
}
