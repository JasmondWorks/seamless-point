"use client";

import * as React from "react";

import { getDeliveriesColumns } from "@/app/_components/table/deliveries";

import Badge, { BadgeVariant } from "./Badge";
import Searchbox from "@/app/_components/Searchbox";
import DataTable from "@/app/_components/DataTable";
import { useDeliveriesStore } from "@/app/_stores/deliveriesStore";

export function DeliveriesTable() {
  // Data variables
  const { deliveries, fetchDeliveries, updateDelivery, cancelDelivery } =
    useDeliveriesStore();

  console.log(deliveries);
  
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // Table layout variables
  const deliveryActions = {
    handleCancelDelivery,
    handleUpdateDelivery,
  };

  const deliveriesColumns = getDeliveriesColumns(deliveryActions);

  const tags = ["completed", "uncompleted", "ongoing", "cancelled/failed"];

  // Handlers
  function handleCancelDelivery(trackingNumber: string) {
    cancelDelivery(trackingNumber);
  }
  function handleUpdateDelivery(trackingNumber: string, status: string) {
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

  function getBadgeStyle(tag: string): BadgeVariant | null {
    switch (tag) {
      case "completed":
        return BadgeVariant.blue;
      case "uncompleted":
        return BadgeVariant.orange;
      case "ongoing":
        return BadgeVariant.neutralDark;
      case "cancelled/failed":
        return BadgeVariant.red;
      default:
        return null;
    }
  }
  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col lg:flex-row gap-20 gap-y-5 justify-between">
        <Searchbox
          placeholder="Search"
          onChange={handleSearch}
          value={searchQuery}
        />
        <div className="flex items-center gap-4 flex-wrap">
          {tags.map((tag) => (
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
