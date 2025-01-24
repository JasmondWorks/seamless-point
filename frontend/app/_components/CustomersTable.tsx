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
import { Button } from "@/app/_components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/app/_components/ui/input";

export function CustomersTable({
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
  } = useAllDeliveries(page, limit, sort);

  console.log(sort);

  const deliveries = formatDeliveries(deliveriesResponse?.data?.delivery);
  const totalCount = deliveriesResponse?.totalCount;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // Table layout variables

  const deliveriesColumns = getDeliveriesColumns(deliveryActions);


  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  if (isLoading) return <DataFetchSpinner />;

  if (isError)
    return (
      <h2 className="text-lg font-bold py-10 text-center">
        Error fetching customers
      </h2>
    );

  if (!totalCount)
    return (
      <h2 className="text-lg font-bold py-10 text-center">
        No customers found
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
        </div>
        <div className="flex flex-col lg:flex-row gap-5 justify-between">
          <div className="relative flex items-center lg:min-w-60 w-full max-w-md">
            <div className="absolute left-3">
              <FaSearch size={12} color="rgba(0 0 0 /.4)" />
            </div>
            <Input
              className="w-full h-8 bg-white pl-8 placeholder:text-xs text-xs placeholder:text-light placeholder:font-light text-neutral-600 !ring-0"
              placeholder="Search for delivery"
            />
          </div>
          <div className="flex gap-5 flex-wrap lg:flex-nowrap">
            <Button variant="outline" size="sm">
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              Download CSV
            </Button>
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
        />
      </div>
    </div>
  );
}
