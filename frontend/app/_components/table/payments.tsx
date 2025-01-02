"use client"; // Ensures everything in this file is client-side safe

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/_components/ui/checkbox";
import Badge, { BadgeVariant } from "@/app/_components/Badge";
import Image from "next/image";
import CopyToClipboard from "@/app/_components/CopyToClipboard";
import ConfirmDialog from "@/app/_components/Dialogs/ConfirmDialog2";
import { useState } from "react";
import SuccessDialog from "@/app/_components/Dialogs/SuccessDialog";
import { formatDate } from "react-datepicker/dist/date_utils";
import { formatDateTime, getBadgeStyle } from "@/app/_lib/utils";

export type Payment = {
  id: string;
  amount: number;
  remark: string;
  date: Date;
  status: string;
};

// Define the columns
export const getPaymentColumns = (): ColumnDef<Payment>[] => {
  return [
    // SELECT ALL
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => {
        const status = row.original.status; // Access 'status' directly from the row data

        return (
          <Checkbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected?.()} // Optional, if partial selection applies
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={`Select row ${row.id}`} // Accessible label for the checkbox
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    // AMOUNT
    {
      id: "amountStatus", // Custom ID for the combined column
      header: () => <div className="text-center">AMOUNT</div>,
      cell: ({ row }) => {
        const amount = row.original.amount; // Access 'amount' directly from the row data
        const status = row.original.status; // Access 'status' directly from the row data

        // Format the amount as currency
        const formattedAmount = new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(amount);

        // Determine badge based on status
        const statusBadge = (() => {
          switch (status) {
            case "ongoing":
              return <Badge variant={BadgeVariant.neutralDark}>Ongoing</Badge>;
            case "completed":
              return <Badge variant={BadgeVariant.blue}>Completed</Badge>;
            case "uncompleted":
              return <Badge variant={BadgeVariant.orange}>Uncompleted</Badge>;
            case "pending":
              return <Badge variant={BadgeVariant.orange}>Pending</Badge>;
            case "cancelled":
              return <Badge variant={BadgeVariant.red}>Cancelled</Badge>;
            case "failed":
              return <Badge variant={BadgeVariant.red}>Failed</Badge>;
            default:
              return <Badge variant={BadgeVariant.red}>Unknown status</Badge>;
          }
        })();

        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(7rem, 1fr) minmax(130px, 1fr)",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <span className="font-medium">{formattedAmount}</span>
            {/* <div className="flex justify-center">{statusBadge}</div> */}
            <div className="flex justify-center">
              <Badge
                className="capitalize font-medium"
                variant={getBadgeStyle(status)}
              >
                {status}
              </Badge>
            </div>
          </div>
          // <div className="flex items-center gap-5">
          //   <span className="font-medium min-w-32">{formattedAmount}</span>
          // </div>
        );
      },
    },
    // ID
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const id = row.getValue("id");

        return (
          <div className="flex gap-2 items-center">
            <span>{id}</span>
            <CopyToClipboard text={id} />
          </div>
        );
      },
    },
    // REMARK
    {
      accessorKey: "remark",
      header: "REMARK",
      cell: ({ row }) => <span>{row.getValue("remark")}</span>,
    },
    // DATE
    {
      accessorKey: "date",
      header: "DATE",
      cell: ({ row }) => {
        return <span>{formatDateTime(row.getValue("date"))}</span>;
      },
    },
  ];
};
