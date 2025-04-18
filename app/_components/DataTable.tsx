"use client";

import { Pagination } from "@/app/_components/Pagination";
import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import React from "react";

import { usePathname, useRouter } from "next/navigation";

export default function DataTable({
  columns,
  data,
  searchQuery,
  selectedTags,
  isBackendPaginated,
  currentPage,
  limit,
  totalCount,
  linkRows = true, // New boolean prop to toggle row linking
  linkRowsBy = "_id",
}: {
  columns: any;
  data: any;
  searchQuery?: string;
  selectedTags?: string[];
  isBackendPaginated?: boolean;
  currentPage?: number;
  limit?: number;
  totalCount?: number;
  linkRows?: boolean; // Boolean to determine if rows should be linked
  linkRowsBy?: string;
}) {
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter(); // Next.js router for programmatic navigation

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const numTotalPages = Math.ceil(totalCount / limit);

  const filteredItems = React.useMemo(() => {
    if (!searchQuery && (!selectedTags || selectedTags.length === 0))
      return data;

    return data.filter((item: any) => {
      const matchesSearch = !searchQuery
        ? true
        : Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
          );

      const matchesTags =
        !selectedTags || selectedTags.length === 0
          ? true
          : selectedTags.some((tag) =>
              tag === "cancelled/failed"
                ? item.status === "cancelled" || item.status === "failed"
                : item.status.toLowerCase() === tag.toLowerCase()
            );

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags, data]);

  const table = useReactTable({
    data: filteredItems,
    columns: columns,
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

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="border-b" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="whitespace-nowrap text-xs text-neutral-400 font-bold uppercase px-8"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const rowHref = `${pathname}/${row.original[linkRowsBy]}`; // Generate row link

              return (
                <TableRow
                  className={`border-b ${
                    linkRows ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  role={linkRows ? "button" : undefined} // Add button role for accessibility
                  onClick={
                    linkRows
                      ? () => router.push(rowHref) // Navigate programmatically
                      : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="whitespace-nowrap px-8" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow className="border-b">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!isBackendPaginated && (
        <div className="flex items-center justify-between space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          {Number(totalCount) >= 10 && (
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
          )}
        </div>
      )}
      {isBackendPaginated && (
        <Pagination currentPage={currentPage} totalPages={numTotalPages} />
      )}
    </div>
  );
}
