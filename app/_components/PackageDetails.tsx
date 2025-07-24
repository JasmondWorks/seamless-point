import { formatCurrency, getParcelTotalWeight } from "@/app/_lib/utils";
import { Edit } from "lucide-react";
import React from "react";

export default function PackageDetails({
  sender,
  receiver,
  parcel,
  courierDetails,
  onSetActivePage,
}: any) {
  const biggestLength = parcel!.parcelItems.reduce(
    (biggest: number, item: any) =>
      item.length > biggest ? (biggest = item.length) : biggest,
    parcel!.parcelItems[0].length
  );
  const biggestWidth = parcel!.parcelItems.reduce(
    (biggest: number, item: any) =>
      item.width > biggest ? (biggest = item.width) : biggest,
    parcel!.parcelItems[0].width
  );
  const biggestHeight = parcel!.parcelItems.reduce(
    (biggest: number, item: any) =>
      item.height > biggest ? (biggest = item.height) : biggest,
    parcel!.parcelItems[0].height
  );
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        <div className="sm:max-w-lg space-y-3 flex-1 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold leading-tight text-gray-900">
              Sender's details
            </h3>
            <button onClick={() => onSetActivePage("sender")}>
              <Edit size={21} color="var(--clr-brand-sec)" />
            </button>
          </div>
          <div className="space-y-5 rounded-3xl p-3 bg-white border border-neutral-300 flex-1 text-sm">
            <div className="flex gap-6 flex-wrap justify-between">
              <div className="space-y-1">
                <p className="font-medium">Name</p>
                <p className="text-muted">
                  {`${sender?.firstName} ${sender?.lastName}` || "John doe"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Email</p>
                <p className="text-muted">
                  {sender?.email || "abcde@example.com"}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Phone Number</p>
              <p className="text-muted">
                {sender?.phoneNumber || "08012345678"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Sender's Address</p>
              <p className="text-muted">
                {`${sender?.aptUnit} ${sender?.street}, ${sender?.city}, ${sender?.state}` ||
                  "Sender's Address"}
              </p>
            </div>
          </div>
        </div>
        <div className="sm:max-w-lg space-y-3 flex-1 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold leading-tight text-gray-900">
              Receiver's details
            </h3>
            <button onClick={() => onSetActivePage("receiver")}>
              <Edit size={21} color="var(--clr-brand-sec)" />
            </button>
          </div>
          <div className="space-y-5 rounded-3xl p-3 bg-white border border-neutral-300 flex-1 text-sm">
            <div className="flex gap-6 flex-wrap justify-between">
              <div className="space-y-1">
                <p className="font-medium">Name</p>
                <p className="text-muted">
                  {`${receiver?.toFirstName} ${receiver?.toLastName}` ||
                    "John doe"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Email</p>
                <p className="text-muted">
                  {receiver?.toEmail || "abcde@example.com"}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Phone Number</p>
              <p className="text-muted">
                {" "}
                {receiver?.toPhoneNumber || "08012345678"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Sender Address</p>
              <p className="text-muted">
                {`${receiver?.toAptUnit} ${receiver?.toStreet}, ${receiver?.toCity}, ${receiver?.toState}` ||
                  "Receiver's Address"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold leading-tight text-gray-900">
            Package details
          </h3>
          <button onClick={() => onSetActivePage("parcel-info")}>
            <Edit size={21} color="var(--clr-brand-sec)" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 whitespace-pre-wrap rounded-3xl p-3 bg-white border border-neutral-300 gap-5 text-sm">
          <div>
            <p className="font-medium mb-1">Amount</p>
            <p className="text-muted">
              {formatCurrency(courierDetails?.amount)}
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Description</p>
            {parcel?.parcelItems.map((item: any) => (
              <p key={item?.name} className="text-muted">
                {item?.name}
              </p>
            ))}
          </div>
          <div>
            <p className="font-medium mb-1">Payment Method</p>
            <p className="text-muted">
              {/* {parcel?.paymentMethod || "N/A"} */}
              N/A
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Payment Status</p>
            <p className="text-muted">
              {/* {parcel?.paymentStatus || "N/A"} */}
              N/A
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Item value</p>
            {parcel?.parcelItems.map((item: any, index: number) => (
              <p key={index} className="text-muted">
                {item?.value || "N/A"}
              </p>
            ))}
          </div>
          <div>
            <p className="font-medium mb-1">Weight</p>
            <p className="text-muted">{getParcelTotalWeight(parcel)}kg</p>
          </div>
          <div>
            <p className="font-medium mb-1">Courier</p>
            <p className="text-muted">{courierDetails?.courierName}</p>
          </div>
          <div>
            <p className="font-medium mb-1">Approved by</p>
            <p className="text-muted">
              {/* {delivery?.deliveryStatus === "pending"
                ? "Not approved yet"
                : delivery?.approvedBy} */}
              Not approved yet
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Length</p>
            <p className="text-muted">{biggestLength}cm</p>
          </div>
          <div>
            <p className="font-medium mb-1">Width</p>
            <p className="text-muted">{biggestWidth}cm</p>
          </div>
          <div>
            <p className="font-medium mb-1">Height</p>
            <p className="text-muted">{biggestHeight}cm</p>
          </div>
          <div>
            <p className="font-medium mb-1">Quantity</p>
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
