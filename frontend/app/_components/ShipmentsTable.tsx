// --downlevelIteration
// --target

"use client";

import * as React from "react";

import { getDeliveriesColumns } from "@/app/_components/table/deliveries";

import Badge from "./Badge";
import Searchbox from "@/app/_components/Searchbox";
import DataTable from "@/app/_components/DataTable";
import { useDeliveriesStore } from "@/app/_stores/deliveriesStore";

import { formatDeliveries, getBadgeStyle } from "@/app/_lib/utils";
import { EDeliveryStatus } from "@/app/_lib/types";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import useAllDeliveries from "@/app/_hooks/deliveries/useAllDeliveries";

export function ShipmentsTable({
  page,
  limit,
  sort,
}: {
  page: number;
  limit: number;
  sort: string;
}) {
  // Data variables
  const { updateDelivery, cancelDelivery } = useDeliveriesStore();

  const {
    deliveries: deliveriesResponse,
    isLoading,
    isError,
  } = useAllDeliveries(page, limit, sort);

  console.log(sort);

  const deliveries = formatDeliveries(deliveriesResponse?.data?.delivery);
  const totalCount = deliveriesResponse?.totalCount;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // Table layout variables
  const deliveryActions = {
    handleCancelDelivery,
    handleUpdateDelivery,
  };

  const deliveriesColumns = getDeliveriesColumns(deliveryActions);

  const tags = deliveries && [...new Set(deliveries?.map((d) => d?.status))];

  // Handlers
  function handleCancelDelivery(trackingNumber: string) {
    cancelDelivery(trackingNumber);
  }
  function handleUpdateDelivery(
    trackingNumber: string,
    status: EDeliveryStatus
  ) {
    updateDelivery(trackingNumber, { status });
  }
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
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
        No shipments found
      </h2>
    );

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="w-full space-y-5">
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
        <DataTable
          columns={deliveriesColumns}
          data={deliveries}
          searchQuery={searchQuery}
          selectedTags={selectedTags}
          isBackendPaginated
          currentPage={page}
          limit={limit}
          totalCount={totalCount}
          linkRowsBy="trackingId"
        />
      </div>
    </div>
  );
}
