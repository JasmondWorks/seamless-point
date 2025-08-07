"use client";

import Badge, { BadgeVariant } from "./Badge";
import Searchbox from "@/app/_components/Searchbox";

import {
  formatCurrency,
  formatDateTime,
  getBadgeStyle,
} from "@/app/_lib/utils";
import useDeliveries from "@/app/_hooks/deliveries/useDeliveries";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import Table from "@/app/_components/Table";
import CopyToClipboard from "@/app/_components/CopyToClipboard";
import Image from "next/image";
import { Pagination } from "@/app/_components/Pagination";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/app/_components/ui/dialog"; // Adjust import
import ConfirmDialogContent from "@/app/_components/ConfirmDialogContent";
import SuccessDialogContent from "@/app/_components/SuccessDialogContent";
import { ChangeEvent, useState } from "react";
import { Trash2Icon } from "lucide-react";
import useCancelDelivery from "@/app/_hooks/deliveries/useCancelDelivery";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DeliveriesTable({
  page,
  limit,
  sort,
}: {
  page: number;
  limit: number;
  sort: string;
}) {
  const {
    deliveries: deliveriesResponse,
    isLoading,
    isError,
  } = useDeliveries(page, limit, sort);

  const totalCount = deliveriesResponse?.totalCount;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags =
    deliveriesResponse?.data.delivery &&
    deliveriesResponse?.data.delivery
      .map((d: any) => d?.status)
      .reduce((acc: string[], cur: string) => {
        if (!acc.includes(cur)) acc.push(cur);

        return acc;
      }, []);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function toggleTag(tag: string) {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  }

  if (isLoading) return <DataFetchSpinner />;

  if (isError)
    return (
      <h2 className="text-lg font-bold py-10 text-center">
        Error fetching deliveries
      </h2>
    );

  if (!totalCount)
    return (
      <h2 className="text-lg font-bold py-10 text-center">
        No deliveries found
      </h2>
    );

  const formattedDeliveries = deliveriesResponse.data.delivery.map(
    (d: any) => ({ ...d, link: d.courierDetails.trackingNumber })
  );

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="w-full mb-5 space-y-5">
        <div className="flex flex-col lg:flex-row gap-20 gap-y-5 justify-between">
          <Searchbox
            placeholder="Search"
            onChange={handleSearch}
            value={searchQuery}
          />
          <div className="flex items-center gap-4 flex-wrap">
            {tags?.map((tag: string) => (
              <button key={tag} onClick={() => toggleTag(tag)}>
                <Badge
                  className={`${
                    selectedTags.includes(tag) ? "opacity-50" : ""
                  }`}
                  key={tag}
                  variant={getBadgeStyle(tag)}
                >
                  {tag[0].toUpperCase() + tag.slice(1)}{" "}
                  {selectedTags.includes(tag) && "x"}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Table
        columns="30px 250px 220px 100px 120px 120px 130px"
        data={formattedDeliveries}
        renderHead={() => (
          <>
            <div className="flex items-center">
              <input className="scale-150 origin-top-left" type="checkbox" />
            </div>
            <div className="flex justify-center">
              <span>AMOUNT</span>
            </div>
            <span>TRACKING NUMBER</span>
            <span className="text-center">DISPATCH</span>
            <span>RECEIVER</span>
            <span>DESTINATION</span>
            <span>DATE</span>
          </>
        )}
        renderRow={(delivery: any) => <DeliveryRow {...delivery} />}
      />

      {page && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalCount / limit)}
        />
      )}
    </div>
  );
}

function DeliveryRow({
  status,
  createdAt,
  courierDetails: { amount, courierLogo, trackingNumber, courierName },
  receiver: { toFirstName, toLastName, toState, toCountry },
}: {
  status: string;
  createdAt: string;
  receiver: {
    toFirstName: string;
    toLastName: string;
    toState: string;
    toCountry: string;
  };
  courierDetails: {
    amount: string;
    courierLogo: string;
    courierName: string;
    trackingNumber: string;
  };
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [activeDialog, setActiveDialog] = useState<
    "confirmCancelDelivery" | "successCancelDelivery"
  >("confirmCancelDelivery");
  const pathname = usePathname();

  // const { cancelDelivery, isLoading } = useCancelDelivery(trackingNumber);

  function handleCancelDelivery() {
    // cancelDelivery(trackingNumber);
    setActiveDialog("successCancelDelivery");
  }
  return (
    <Link
      href={`${pathname}/${trackingNumber}`}
      style={{
        display: "grid",
        gridTemplateColumns: "30px 250px 220px 100px 120px 120px 130px",
      }}
    >
      <div>
        <input
          className="scale-150 origin-left mr-4"
          type="checkbox"
          checked={isSelected}
          onChange={() => setIsSelected((cur) => !cur)}
        />

        {isSelected && (
          <Dialog>
            <DialogTrigger>
              <button>
                <Trash2Icon size={21} className="text-red-600" />
              </button>
            </DialogTrigger>
            <DialogContent>
              {activeDialog === "confirmCancelDelivery" && (
                <ConfirmDialogContent
                  title="Are you sure that you want to cancel this delivery"
                  description="Please proceed with caution"
                  onConfirm={handleCancelDelivery}
                />
              )}
              {activeDialog === "successCancelDelivery" && (
                <SuccessDialogContent title="Your delivery has been cancelled successfully" />
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="grid grid-cols-[135px_auto] justify-center items-center">
        <span>{formatCurrency(Number(amount))}</span>
        <Badge className="text-xs !p-1" variant={BadgeVariant.neutralDark}>
          {status.replace(status[0], status[0].toUpperCase())}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <CopyToClipboard text={`Invoice ${trackingNumber}`} />
        <span>Invoice {trackingNumber}</span>
      </div>
      <div className="relative h-8">
        <Image
          fill
          src={courierLogo}
          alt={courierName}
          className="object-contain"
        />
      </div>
      <span>
        {toFirstName} {toLastName}
      </span>
      <span>
        {toState}, {toCountry}
      </span>
      <span>{formatDateTime(createdAt)}</span>
    </Link>
  );
}
