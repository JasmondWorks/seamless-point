import { DataTable } from "@/app/_components/DataTable";
import {
  deliveriesColumns,
  deliveriesData,
} from "@/app/_components/table/deliveries";
import React from "react";

export default function Deliveries() {
  return (
    <>
      <h1 className="headline">Deliveries</h1>
      <div className="bg-white p-5 rounded-xl">
        <DataTable data={deliveriesData} columns={deliveriesColumns} />
      </div>
    </>
  );
}
