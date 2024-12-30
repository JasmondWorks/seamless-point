// --downlevelIteration
// --target

"use client";

import * as React from "react";

import { getDeliveriesColumns } from "@/app/_components/table/deliveries";

import Badge from "./Badge";
import Searchbox from "@/app/_components/Searchbox";
import DataTable from "@/app/_components/DataTable";
import { useDeliveriesStore } from "@/app/_stores/deliveriesStore";
import { useQuery } from "@tanstack/react-query";
import { fetchDeliveries } from "@/app/_lib/actions";
import Loader from "@/app/_components/Loader";
import { formatDeliveries, getBadgeStyle } from "@/app/_lib/utils";
import { EDeliveryStatus } from "@/app/_lib/types";

export function DeliveriesTable({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) {
  // Data variables
  const { updateDelivery, cancelDelivery } = useDeliveriesStore();
  const {
    data: deliveriesResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deliveries"],
    queryFn: () => fetchDeliveries(page, limit),
    refetchInterval: 60000, // Refetch every 60 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  console.log(deliveriesResponse);

  // How do I handle pagination?

  // How do I implement pagination that's coming from the backend?

  // console.log(deliveriesResponse);

  // Create relevant variables based on the data

  const deliveries = formatDeliveries(deliveriesResponse?.data?.data.delivery);
  const totalCount = deliveriesResponse?.data?.totalCount;
  const results = deliveriesResponse?.data?.results;
  const numberOfPages = Math.ceil(totalCount / results);

  console.log(deliveries);

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

  if (isLoading)
    return (
      <div className="grid place-items-center py-10">
        <Loader />
      </div>
    );

  if (isError) return <div>Error fetching deliveries</div>;

  if (!totalCount)
    return (
      <h2 className="text-lg font-bold py-10 text-center">
        No deliveries found
      </h2>
    );

  return (
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
                className={`${selectedTags.includes(tag) ? "opacity-50" : ""}`}
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
      />
    </div>
  );
}
