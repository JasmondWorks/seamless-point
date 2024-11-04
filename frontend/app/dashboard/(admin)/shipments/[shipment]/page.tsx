import DeliveryStatusItem from "@/app/dashboard/tracking/components/DeliveryStatusItem";
import StepCheckbox from "@/app/dashboard/tracking/components/StepCheckbox";
import Card from "@/components/Card";
import { title } from "process";
import React from "react";

// export async function generateStaticParams() {
//   return categories.map((category) => ({
//     category: urlParser(category.title), // Only return the category ID/slug for the URL
//   }));
// }


export default function ShipmentDetails() {
  // const step = {
  //     id: 4,
  //     title: 'timeline 1',
  //     desc: 'a single timeline'
  // }
  const currentStep = 2;
  return (
    <>
      <h1 className="headline">Shipment details</h1>
      <div className="space-y-8">
        <div className="flex flex-col items-stretch lg:flex-row justify-between gap-8">
          <div className="flex-1 lg:max-w-md">
            <h3 className="text-xl mb-3 font-bold">Sender's details</h3>
            <Card className="!rounded-3xl">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between gap-5 flex-wrap">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold">Name</span>
                    <span className="text-light">John Doe</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-bold">Email</span>
                    <span className="text-light">abc@example.com</span>
                  </div>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <span className="font-bold">Phone Number</span>
                  <span className="text-light">0801234567</span>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <span className="font-bold">Sender Address</span>
                  <span className="text-light">
                    A street, B estate, Lagos, Nigeria
                  </span>
                </div>
                {/* <div className="grid gap-5 grid-cols-2 justify-between"></div> */}
              </div>
            </Card>
          </div>
          <div className="flex-1 lg:max-w-md">
            <h3 className="text-xl mb-3 font-bold">Receiver's details</h3>
            <Card className="!rounded-3xl">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between gap-5 flex-wrap">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold">Name</span>
                    <span className="text-light">John Doe</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-bold">Email</span>
                    <span className="text-light">abc@example.com</span>
                  </div>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <span className="font-bold">Phone Number</span>
                  <span className="text-light">0801234567</span>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <span className="font-bold">Receiver Address</span>
                  <span className="text-light">
                    A street, B estate, Lagos, Nigeria
                  </span>
                </div>
                {/* <div className="grid gap-5 grid-cols-2 justify-between"></div> */}
              </div>
            </Card>
          </div>
        </div>
        <div>
          <h3 className="text-xl mb-3 font-bold">Package details</h3>
          <Card className="!rounded-3xl max-h-72 lg:max-h-max overflow-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-10 flex-wrap">
              <div className="flex flex-col gap-2">
                <span className="font-bold">Amount</span>
                <span className="text-light">N20,000</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Description</span>
                <span className="text-light">Lorem ipsum dolor sit amet.</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Payment method</span>
                <span className="text-light">Wallet</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Payment status</span>
                <span className="text-light">Paid</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Item value</span>
                <span className="text-light">N200,000</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Weight</span>
                <span className="text-light">20kg</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Courier</span>
                <span className="text-light">DHL</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Approved by</span>
                <span className="text-light">beo</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Length</span>
                <span className="text-light">20cm</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Width</span>
                <span className="text-light">20cm</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Height</span>
                <span className="text-light">15cm</span>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <h3 className="text-xl mb-3 font-bold">Package Timeline</h3>
          <Card className="p-8 !rounded-3xl">
            <div className="flex flex-col gap-10 lg:flex-row justify-between text-center">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="flex flex-row lg:flex-col gap-5 items-center"
                >
                  <StepCheckbox isStepCompleted={currentStep > i} />
                  {currentStep > i && (
                    <h3 className="text-lg font-bold">Timeline {i + 1}</h3>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
