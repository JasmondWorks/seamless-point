import Badge, { BadgeVariant } from "@/components/Badge";
import Card from "@/components/Card";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FaSearch } from "react-icons/fa";

import {
  deliveriesColumns,
  deliveriesData,
} from "../../components/table/deliveries";

export default function Shipments() {
  return (
    <>
      <h1 className="headline">Shipment details</h1>
        <Card className="bg-white border-0">
          <div className="flex justify-between items-center gap-5 flex-wrap">
            {/* <div className="flex gap-5">
              <div className="relative flex items-center">
                <div className="absolute left-3">
                  <FaSearch size={12} color="rgba(0 0 0 /.4)" />
                </div>
                <Input
                  className="w-full h-full bg-white pl-8 placeholder:text-xs text-xs placeholder:text-light placeholder:font-light text-neutral-600 !ring-0"
                  placeholder="Search for delivery"
                />
              </div>
              <Button variant="outline" size="sm">
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                Download CSV
              </Button>
            </div> */}
            {/* <div className="flex gap-5 items-center">
              <Badge variant={BadgeVariant.blue} text="Approved" />
              <Badge variant={BadgeVariant.red} text="Rejected" />
            </div> */}
          </div>
          <DataTable data={deliveriesData} columns={deliveriesColumns} />
        </Card>
      
    </>
  );
}
