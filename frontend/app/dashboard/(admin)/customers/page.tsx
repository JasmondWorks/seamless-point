import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Customers() {
  return (
    <>
      <h1 className="headline">Customers</h1>
      <Card className="border-0 space-y-5">
        <div className="flex flex-col lg:flex-row gap-5 justify-between">
          <div className="relative flex items-center lg:min-w-60 w-full max-w-md">
            <div className="absolute left-3">
              <FaSearch size={12} color="rgba(0 0 0 /.4)" />
            </div>
            <Input
              className="w-full h-8 bg-white pl-8 placeholder:text-xs text-xs placeholder:text-light placeholder:font-light text-neutral-600 !ring-0"
              placeholder="Search for delivery"
            />
          </div>
          <div className="flex gap-5 flex-wrap lg:flex-nowrap">
            <Button variant="outline" size="sm">
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              Download CSV
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-light min-w-44 whitespace-nowrap font-bold">
                NAME
              </TableHead>
              <TableHead className="text-light whitespace-nowrap font-bold">
                EMAIL
              </TableHead>
              <TableHead className="text-light whitespace-nowrap font-bold">
                PHONE NUMBER
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 7 }, (_, i) => (
              <TableRow key={i} className={`${i === 6 ? "!border-0" : ""}`}>
                <TableCell className="h-12">Diane Rusell</TableCell>
                <TableCell className="h-12">curtis.d@example.com</TableCell>
                <TableCell className="h-12">08012345678</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
