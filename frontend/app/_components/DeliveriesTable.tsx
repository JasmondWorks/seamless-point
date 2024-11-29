"use client";

import * as React from "react";

import {
  getDeliveriesColumns,
  Delivery,
} from "@/app/_components/table/deliveries";

import Badge, { BadgeVariant } from "./Badge";
import Searchbox from "@/app/_components/Searchbox";
import DataTable from "@/app/_components/DataTable";

export const initialDeliveriesData: Delivery[] = [
  {
    trackingNumber: "4b547d95-8908-47cc-96f1-8d0c02f28bfb",
    amount: 316,
    status: "uncompleted",
    receiver: "John Doe",
    destination: "Mainland, Lagos",
    date: new Date(),
    dispatch: "dispatch1.png",
  },
  {
    trackingNumber: "74f8b1ad-d676-46cd-8efa-4b0dbc788368",
    amount: 242,
    status: "ongoing",
    receiver: "Jane Doe",
    destination: "Challenge, Ibadan",
    date: new Date(),
    dispatch: "dispatch2.png",
  },
  {
    trackingNumber: "2da81086-0ca2-43e5-b09e-dacf0efdb5cc",
    amount: 456,
    status: "completed",
    receiver: "Michael Smith",
    destination: "Victoria Island, Lagos",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch3.png",
  },
  {
    trackingNumber: "d123e45f-6789-4abc-9101-d23ef4567gh8",
    amount: 512,
    status: "cancelled",
    receiver: "Sarah Connor",
    destination: "Garki, Abuja",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch4.png",
  },
  {
    trackingNumber: "a234f56b-7890-4cde-1234-e56789fghijk",
    amount: 378,
    status: "failed",
    receiver: "Chris Evans",
    destination: "Ikoyi, Lagos",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch5.png",
  },
  {
    trackingNumber: "567f8g9h-1i23-4567-j890-123k4lmno567",
    amount: 293,
    status: "uncompleted",
    receiver: "Emily Blunt",
    destination: "Lekki, Lagos",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch6.png",
  },
  {
    trackingNumber: "4h5i6j7k-8l90-1234-m567-nopqr8stu901",
    amount: 405,
    status: "completed",
    receiver: "Peter Parker",
    destination: "Surulere, Lagos",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch7.png",
  },
  {
    trackingNumber: "abcd1234-efgh-5678-ijkl-9012mnop3456",
    amount: 512,
    status: "ongoing",
    receiver: "Clark Kent",
    destination: "Ikeja, Lagos",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch8.png",
  },
  {
    trackingNumber: "mnop4567-qrst-8912-uvwx-3456yzab9012",
    amount: 430,
    status: "cancelled",
    receiver: "Diana Prince",
    destination: "Asokoro, Abuja",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch9.png",
  },
  {
    trackingNumber: "ghij5678-klmn-9123-opqr-5678stuv9012",
    amount: 389,
    status: "failed",
    receiver: "Bruce Wayne",
    destination: "Apapa, Lagos",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch10.png",
  },
  {
    trackingNumber: "ijkl6789-mnop-1234-qrst-7890uvwx3456",
    amount: 275,
    status: "completed",
    receiver: "Natasha Romanoff",
    destination: "Ajah, Lagos",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch11.png",
  },
  {
    trackingNumber: "uvwx3456-yzab-6789-cdef-1234ghij9012",
    amount: 347,
    status: "uncompleted",
    receiver: "Tony Stark",
    destination: "Yaba, Lagos",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch12.png",
  },
  {
    trackingNumber: "klmn7890-opqr-1234-stuv-4567wxyz9012",
    amount: 458,
    status: "ongoing",
    receiver: "Steve Rogers",
    destination: "Maitama, Abuja",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch13.png",
  },
  {
    trackingNumber: "cdef5678-ghij-9012-klmn-7890opqr1234",
    amount: 512,
    status: "cancelled",
    receiver: "Thor Odinson",
    destination: "Ogudu, Lagos",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch14.png",
  },
  {
    trackingNumber: "mnop1234-qrst-4567-uvwx-9012yzab6789",
    amount: 423,
    status: "failed",
    receiver: "Loki Laufeyson",
    destination: "Gwarimpa, Abuja",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch15.png",
  },
  {
    trackingNumber: "qrst4567-uvwx-6789-yzab-3456cdef9012",
    amount: 510,
    status: "completed",
    receiver: "Wanda Maximoff",
    destination: "Ojodu, Lagos",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch16.png",
  },
  {
    trackingNumber: "abcdef78-1234-ghij-5678-klmn90opqrs",
    amount: 380,
    status: "uncompleted",
    receiver: "Barbara Gordon",
    destination: "Kaduna",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch17.png",
  },
  {
    trackingNumber: "ab123456-cd7890-ef1234-gh5678-ij901234",
    amount: 499,
    status: "ongoing",
    receiver: "Dick Grayson",
    destination: "Benin City",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch18.png",
  },
  {
    trackingNumber: "4567mnop-7890qrst-1234uvwx-5678yzab",
    amount: 379,
    status: "completed",
    receiver: "Tim Drake",
    destination: "Oyo",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch19.png",
  },
  {
    trackingNumber: "1234abcd-5678efgh-9012ijkl-3456mnop",
    amount: 402,
    status: "cancelled",
    receiver: "Caitlyn Snow",
    destination: "Ilorin",
    date: new Date(new Date().getTime() - Math.random() * 10000000000),
    dispatch: "dispatch20.png",
  },
];

export function DeliveriesTable() {
  // Data variables
  const [deliveries, setDeliveries] = React.useState<Delivery[]>(
    initialDeliveriesData
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // Table layout variables
  const deliveriesColumns = getDeliveriesColumns(handleCancelDelivery);

  const tags = ["completed", "uncompleted", "ongoing", "cancelled/failed"];

  // Handlers
  function handleCancelDelivery(trackingNumber: string) {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.trackingNumber === trackingNumber
          ? { ...delivery, status: "cancelled" }
          : delivery
      )
    );
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
            <button onClick={() => toggleTag(tag)}>
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
