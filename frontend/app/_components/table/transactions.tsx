"use client"; // Ensures everything in this file is client-side safe

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/_components/ui/checkbox";
import Badge, { BadgeVariant } from "@/app/_components/Badge";
import CopyToClipboard from "@/app/_components/CopyToClipboard";
import { formatDateTime } from "@/app/_lib/utils";

// Define your delivery type
export type Transaction = {
  amount: number;
  status: string;
  id: string;
  paymentType: string;
  date: Date | string;
};

// Define the columns
export const getTransactionsColumns = (): ColumnDef<Transaction>[] => {
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

        // Determine badge variant based on status
        let variant;
        switch (status) {
          case "completed":
            variant = BadgeVariant.blue;
            break;
          case "failed":
            variant = BadgeVariant.red;
            break;
          default:
            variant = BadgeVariant.neutralDark;
            break;
        }

        return (
          <div className="flex items-center gap-10">
            <span className="font-medium">{formattedAmount}</span>
            <Badge variant={variant} className="capitalize">
              {status}
            </Badge>
            ;
          </div>
        );
      },
    },
    // TRACKING NUM
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
    // COURIER
    {
      accessorKey: "paymentType",
      header: "PAYMENT TYPE",
      cell: ({ row }) => <span>{row.getValue("paymentType")}</span>,
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
