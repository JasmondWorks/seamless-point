import { DataTable } from "@/app/_components/DeliveriesTable";
import React from "react";
import {
  deliveriesColumns,
  deliveriesData,
} from "../../_components/table/deliveries";

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
