import { DataTable } from "@/components/DataTable";
import React from "react";
import {
  deliveriesColumns,
  deliveriesData,
} from "../components/table/deliveries";

export default function Deliveries() {
  return (
    <>
      <h1 className="headline">Payments</h1>
      <div className="bg-white p-5 rounded-xl">
        <DataTable data={deliveriesData} columns={deliveriesColumns} />
      </div>
    </>
  );
}
