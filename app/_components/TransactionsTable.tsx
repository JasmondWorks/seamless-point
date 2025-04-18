"use client";

import * as React from "react";

import Badge, { BadgeVariant } from "./Badge";
import Searchbox from "@/app/_components/Searchbox";
import DataTable from "@/app/_components/DataTable";

import Button, { ButtonVariant } from "@/app/_components/Button";
import {
  getTransactionsColumns,
  Transaction,
} from "@/app/_components/table/transactions";

export const initialTransactionsData: Transaction[] = [
  {
    id: "TXN001",
    amount: 1200.5,
    status: "completed",
    paymentType: "deposit",
    date: "2024-11-01",
  },
  {
    id: "TXN002",
    amount: 500.0,
    status: "failed",
    paymentType: "withdrawal",
    date: "2024-11-02",
  },
  {
    id: "TXN003",
    amount: 3000.75,
    status: "completed",
    paymentType: "bank charge",
    date: "2024-11-03",
  },
  {
    id: "TXN004",
    amount: 1500.0,
    status: "completed",
    paymentType: "deposit",
    date: "2024-11-04",
  },
  {
    id: "TXN005",
    amount: 800.0,
    status: "failed",
    paymentType: "withdrawal",
    date: "2024-11-05",
  },
  {
    id: "TXN006",
    amount: 200.0,
    status: "completed",
    paymentType: "bank charge",
    date: "2024-11-06",
  },
  {
    id: "TXN007",
    amount: 1000.0,
    status: "completed",
    paymentType: "deposit",
    date: "2024-11-07",
  },
  {
    id: "TXN008",
    amount: 400.0,
    status: "failed",
    paymentType: "withdrawal",
    date: "2024-11-08",
  },
  {
    id: "TXN009",
    amount: 600.5,
    status: "completed",
    paymentType: "bank charge",
    date: "2024-11-09",
  },
  {
    id: "TXN010",
    amount: 2500.0,
    status: "completed",
    paymentType: "deposit",
    date: "2024-11-10",
  },
];

export function TransactionsTable() {
  // Data variables
  const [data, setData] = React.useState<Transaction[]>(
    initialTransactionsData
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  // Table layout variables
  const columns = getTransactionsColumns();

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col lg:flex-row gap-20 gap-y-5 justify-between">
        <Searchbox
          placeholder="Search"
          onChange={handleSearch}
          value={searchQuery}
        />
        <div className="flex gap-5">
          <Button variant={ButtonVariant.outline} text="Download PDF" />
          <Button variant={ButtonVariant.outline} text="Download CSV" />
        </div>
      </div>
      <DataTable columns={columns} data={data} searchQuery={searchQuery} />
    </div>
  );
}
