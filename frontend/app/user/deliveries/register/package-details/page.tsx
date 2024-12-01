"use client";

import ButtonFormSubmit from "@/app/_components/ButtonFormSubmit";
import { useDeliveryFormStore } from "@/app/_stores/createDeliveryFormStore";
import { useRouter } from "next/navigation";
import React from "react";

export default function PackageDetailsPage() {
  const router = useRouter();
  function onSubmit() {
    router.push("/user/deliveries/register/payment");
  }

  const sender = useDeliveryFormStore((store) => store.sender);
  const receiver = useDeliveryFormStore((store) => store.receiver);

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
                  {`${sender?.firstname} ${sender?.lastname}` || "John doe"}
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
                  "B Close Port-Harcourt Rivers 500 84928 482 38437 982, Nigeria"}
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
                  {`${receiver?.toFirstname} ${receiver?.toLastname}` ||
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
                {receiver?.toPhone || "08012345678"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-bold">Sender Address</p>
              <p className="text-muted">
                {`${receiver?.toAptUnit} ${receiver?.toStreet}, ${receiver?.toCity}, ${receiver?.toState}` ||
                  "B Close Port-Harcourt Rivers 500 84928 482 38437 982, Nigeria"}{" "}
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
          className="rounded-3xl p-3 bg-white border border-neutral-300 gap-6 no-scrollbar overflow-x-auto"
        >
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Phone Number</p>
            <p className="text-muted">08012345678</p>
          </div>
        </div>
      </div>
      <ButtonFormSubmit onClick={onSubmit} text="I UNDERSTAND" />
    </div>
  );
}
