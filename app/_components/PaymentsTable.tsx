"use client";

import * as React from "react";

import { getPaymentColumns } from "@/app/_components/table/payments";

import Searchbox from "@/app/_components/Searchbox";
import DataTable from "@/app/_components/DataTable";
import { Payment } from "@/app/_components/table/payments";

export const initialPaymentsData: Payment[] = [
  {
    id: "1d8f87e5-90f0-4c13-bf82-4047fe881828",
    amount: 250,
    remark: "Payment for order #4536",
    date: new Date("2024-11-20T14:32:00"),
    status: "completed",
  },
  {
    id: "1d8f87e5-90f0-4c13-bf82-4047fe881828a",
    amount: 250,
    remark: "Payment for order #4536",
    date: new Date("2024-11-20T14:32:00"),
    status: "completed",
  },
  {
    id: "1d8f87e5-90f0-4c13-bf82-4047fe881828b",
    amount: 250,
    remark: "Payment for order #4536",
    date: new Date("2024-11-20T14:32:00"),
    status: "completed",
  },
  {
    id: "1d8f87e5-90f0-4c13-bf82-4047fe881828c",
    amount: 250,
    remark: "Payment for order #4536",
    date: new Date("2024-11-20T14:32:00"),
    status: "completed",
  },
  {
    id: "7b9a48b7-3c38-49e5-bfd2-651e6fe9d37c",
    amount: 1200,
    remark: "Refund for cancellation of order #3211",
    date: new Date("2024-11-21T10:45:00"),
    status: "completed",
  },
  {
    id: "e2c6d1ae-c307-4e9e-8b7b-9a9d5ff874f7",
    amount: 350,
    remark: "Payment for order #7824",
    date: new Date("2024-11-22T16:20:00"),
    status: "pending",
  },
  {
    id: "342a2f26-410b-44ca-97cf-ec0391e4b813",
    amount: 50,
    remark: "Partial payment for order #1932",
    date: new Date("2024-11-23T08:15:00"),
    status: "completed",
  },
  {
    id: "a3b90b1f-ea02-4700-8211-3959b10a2a3e",
    amount: 500,
    remark: "Payment for order #2011",
    date: new Date("2024-11-24T12:00:00"),
    status: "failed",
  },
  {
    id: "b7395e94-5ad9-451e-8b69-d8cf0474c9ad",
    amount: 800,
    remark: "Payment for order #9241",
    date: new Date("2024-11-25T09:50:00"),
    status: "completed",
  },
  {
    id: "c4a8dfac-c51e-4b99-9ae5-f5f27188e7c6",
    amount: 150,
    remark: "Payment for order #6712",
    date: new Date("2024-11-26T13:00:00"),
    status: "pending",
  },
  {
    id: "1e1c0546-3e45-4e76-86c2-0ab8a5d60b6d",
    amount: 450,
    remark: "Payment for order #5230",
    date: new Date("2024-11-27T15:30:00"),
    status: "completed",
  },
  {
    id: "4a2e53be-0c7e-4534-bfe9-04097b5dbf8d",
    amount: 350,
    remark: "Payment for order #6543",
    date: new Date("2024-11-28T11:10:00"),
    status: "failed",
  },
  {
    id: "9a8c4c82-1b49-4384-84ac-8f6d2d7647d9",
    amount: 1000,
    remark: "Payment for order #4731",
    date: new Date("2024-11-29T09:05:00"),
    status: "completed",
  },
];

export function PaymentsTable() {
  // Data variables
  const [payments, setPayments] =
    React.useState<Payment[]>(initialPaymentsData);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Table layout variables
  const paymentsColumns = getPaymentColumns();

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="w-full space-y-5">
      <Searchbox
        className="md:min-w-[500px]"
        placeholder="Search for payments"
        onChange={handleSearch}
        value={searchQuery}
      />
      <DataTable
        columns={paymentsColumns}
        data={payments}
        searchQuery={searchQuery}
      />
    </div>
  );
}
