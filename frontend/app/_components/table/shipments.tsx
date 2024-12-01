"use client"; // Ensures everything in this file is client-side safe

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/_components/ui/checkbox";
import Badge, { BadgeVariant } from "@/app/_components/Badge";
import CopyToClipboard from "@/app/_components/CopyToClipboard";
import { formatDateTime } from "@/app/_lib/utils";

// Define your delivery type
export type Shipment = {
  amount: number;
  status: string;
  trackingNumber: string;
  courier: string;
  sender: string;
  destination: string;
  date: Date;
};

// Define the columns
export const getShipmentsColumns = (): ColumnDef<Shipment>[] => {
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
          case "approved":
            variant = BadgeVariant.blue;
            break;
          case "rejected":
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
      accessorKey: "trackingNumber",
      header: "TRACKING NUMBER",
      cell: ({ row }) => {
        const trackingNumber = row.getValue("trackingNumber");
        return (
          <div className="flex gap-2 items-center">
            <span>{trackingNumber}</span>
            <CopyToClipboard text={trackingNumber} />
          </div>
        );
      },
    },
    // COURIER
    {
      accessorKey: "courier",
      header: "COURIER",
      cell: ({ row }) => <span>{row.getValue("courier")}</span>,
    },
    // SENDER
    {
      accessorKey: "sender",
      header: "SENDER",
      cell: ({ row }) => <span>{row.getValue("sender")}</span>,
    },
    // DESTINATION
    {
      accessorKey: "destination",
      header: "DESTINATION",
      cell: ({ row }) => <span>{row.getValue("destination")}</span>,
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
