"use client";

import * as React from "react";

import Badge, { BadgeVariant } from "./Badge";
import Searchbox from "@/app/_components/Searchbox";
import DataTable from "@/app/_components/DataTable";
import {
  getShipmentsColumns,
  Shipment,
} from "@/app/_components/table/shipments";

export const initialShipmentsData: Shipment[] = [
  {
    trackingNumber: "DHL1234567890",
    amount: 1200.5,
    status: "approved",
    sender: "Jane Smith",
    destination: "Lagos, Nigeria",
    date: new Date("2024-11-25T14:48:00.000Z"),
    courier: "DHL",
  },
  {
    trackingNumber: "UPS0987654321",
    amount: 800.0,
    status: "rejected",
    sender: "Bob Brown",
    destination: "Abuja, Nigeria",
    date: new Date("2024-11-23T09:30:00.000Z"),
    courier: "UPS",
  },
  {
    trackingNumber: "FEDEX1122334455",
    amount: 1500.75,
    status: "approved",
    sender: "Sara O'Connor",
    destination: "Port Harcourt, Nigeria",
    date: new Date("2024-11-24T11:20:00.000Z"),
    courier: "FedEx",
  },
  {
    trackingNumber: "TNT5566778899",
    amount: 200.0,
    status: "rejected",
    sender: "George Clark",
    destination: "Kano, Nigeria",
    date: new Date("2024-11-22T17:40:00.000Z"),
    courier: "TNT",
  },
  {
    trackingNumber: "USPS3344556677",
    amount: 950.3,
    status: "approved",
    sender: "Amanda Green",
    destination: "Enugu, Nigeria",
    date: new Date("2024-11-21T13:15:00.000Z"),
    courier: "USPS",
  },
  {
    trackingNumber: "DHL2233445566",
    amount: 1050.25,
    status: "approved",
    sender: "David Johnson",
    destination: "Ibadan, Nigeria",
    date: new Date("2024-11-20T10:00:00.000Z"),
    courier: "DHL",
  },
];

export function ShipmentsTable() {
  // Data variables
  const [data, setData] = React.useState<Shipment[]>(initialShipmentsData);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // Table layout variables
  const columns = getShipmentsColumns();

  const tags = ["approved", "rejected"];

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
      case "approved":
        return BadgeVariant.blue;
      case "rejected":
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
        columns={columns}
        data={data}
        searchQuery={searchQuery}
        selectedTags={selectedTags}
      />
    </div>
  );
}
