import React, { createContext, useContext, useState } from "react";
import { Delivery } from "@/app/_components/table/deliveries";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

// Define the context type
interface TableContextType {
  deliveries: Delivery[];
  setDeliveries: React.Dispatch<React.SetStateAction<Delivery[]>>;
  rowSelection: Record<string, boolean>;
  setRowSelection: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  sorting: SortingState; // Correct type for sorting state
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>; // Correct type for sorting setter
  columnVisibility: VisibilityState; // Correct type for sorting state
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>; // Correct type for sorting setter
  columnFilters: ColumnFiltersState; // Correct type for column filters state
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>; // Correct type for column filters setter
  handleCancelDelivery: (delivery: Delivery) => void;
}

// Create the context
const TableContext = createContext<TableContextType | undefined>(undefined);

// Context provider
export const TableProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  function handleCancelDelivery(delivery: Delivery) {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.trackingNumber === delivery.trackingNumber
          ? { ...d, status: "cancelled" }
          : d
      )
    );
  }

  return (
    <TableContext.Provider
      value={{
        deliveries,
        setDeliveries,
        rowSelection,
        setRowSelection,
        handleCancelDelivery,
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        columnVisibility,
        setColumnVisibility,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

// Custom hook for accessing the context
export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
