"use client";

import Card from "@/app/_components/Card";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import { Pagination } from "@/app/_components/Pagination";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import useCustomers from "@/app/_hooks/useCustomers";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Customers({
  searchParams,
}: {
  searchParams: { page: string; limit: string; sort: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "10");
  const sort = searchParams.sort || "-createdAt";

  const { customers, isLoading, isError } = useCustomers(page, limit, sort);
  const totalCount = customers?.totalCount;
  const numTotalPages = Math.ceil(totalCount / limit);

  console.log(customers);

  return (
    <>
      <h1 className="headline">Customers</h1>
      {!isLoading && (
        <Card className="border-0 space-y-5">
          <div className="flex flex-col lg:flex-row gap-5 justify-between">
            <div className="relative flex items-center lg:min-w-60 w-full max-w-md">
              <div className="absolute left-3">
                <FaSearch size={12} color="rgba(0 0 0 /.4)" />
              </div>
              <Input
                className="w-full h-8 bg-white pl-8 placeholder:text-xs text-xs placeholder:text-light placeholder:font-light text-neutral-600 !ring-0"
                placeholder="Search for customers"
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
              {customers.data.users.map((user: any) => (
                <TableRow key={user._id}>
                  <TableCell className="h-12">
                    {user.firstName} {user.lastName}
                    {(!user.firstName && !user.lastName) && "N/A"}
                  </TableCell>
                  <TableCell className="h-12">{user.email}</TableCell>
                  <TableCell className="h-12">{user.phone || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination currentPage={page} totalPages={numTotalPages} />
        </Card>
      )}
      {isLoading && <DataFetchSpinner />}
    </>
  );
}
