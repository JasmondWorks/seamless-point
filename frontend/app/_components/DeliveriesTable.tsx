"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  getDeliveriesColumns,
  Delivery,
} from "@/app/_components/table/deliveries";

import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import Badge, { BadgeVariant } from "./Badge";
import Searchbox from "@/app/_components/Searchbox";

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
    amount: 242,
    status: "ongoing",
    receiver: "Jane Doe",
    destination: "Challenge, Ibadan",
    date: new Date(),
    dispatch: "dispatch2.png",
  },
  {
    trackingNumber: "e68020e6-ef49-4485-8c9c-9fde85dce071",
    amount: 242,
    status: "ongoing",
    receiver: "Jane Doe",
    destination: "Challenge, Ibadan",
    date: new Date(),
    dispatch: "dispatch2.png",
  },
];

export function DeliveriesTable() {
  const [deliveries, setDeliveries] = React.useState<Delivery[]>(
    initialDeliveriesData
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const deliveriesColumns = getDeliveriesColumns(handleCancelDelivery);

  const table = useReactTable({
    data: deliveries,
    columns: deliveriesColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Handlers
  function handleCancelDelivery(trackingNumber: string) {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.trackingNumber === trackingNumber
          ? { ...delivery, status: "cancelled" }
          : delivery
      )
    );
    console.log(trackingNumber);
  }

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col lg:flex-row gap-20 gap-y-5 justify-between">
        <Searchbox placeholder="Search" />
        <div className="flex items-center gap-4 flex-wrap">
          <Badge variant={BadgeVariant.blue}>Completed</Badge>
          <Badge variant={BadgeVariant.orange}>Uncompleted</Badge>
          <Badge variant={BadgeVariant.neutralDark}>Ongoing</Badge>
          <Badge variant={BadgeVariant.red}>Cancelled/failed</Badge>
        </div>
      </div>
      <div className="rounded-md text-center">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-b" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="whitespace-nowrap text-xs text-neutral-400 font-bold uppercase"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-b"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="whitespace-nowrap" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-b">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
