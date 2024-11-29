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

import React from "react";

export default function DataTable({
  columns,
  data,
  searchQuery,
  selectedTags = null,
}) {
  // Table config variables
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Dynamic filtering logic
  // const filteredItems = React.useMemo(() => {
  //   if (!searchQuery) return data;
  //   return data.filter((item: any) =>
  //     Object.values(item).some((value) =>
  //       String(value).toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   );
  // }, [searchQuery, data]);

  console.log(selectedTags);

  let filteredItems;

  if (selectedTags)
    filteredItems = React.useMemo(() => {
      if (!searchQuery && selectedTags.length === 0) return data;

      return data.filter((item: any) => {
        // Check if item matches search query
        const matchesSearch = Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Check if item matches selected tags (with special handling for "cancelled/failed" tag)
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.some((tag) => {
            if (tag === "cancelled/failed") {
              // Match either "cancelled" or "failed" status
              return item.status === "cancelled" || item.status === "failed";
            }
            return item.status.toLowerCase() === tag.toLowerCase();
          });

        // Only return items that match both search query and tags criteria
        return matchesSearch && matchesTags;
      });
    }, [searchQuery, selectedTags, data]);

  if (!selectedTags)
    filteredItems = React.useMemo(() => {
      if (!searchQuery) return data;
      return data.filter((item: any) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, [searchQuery, data]);

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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="border-b">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
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
