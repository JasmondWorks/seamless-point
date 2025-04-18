"use client";

import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import RecentEntityData from "@/app/_components/RecentEntityData";
import {
  fetchLatestCustomers,
  fetchLatestDeliveries,
} from "@/app/_lib/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const recentCustomers = [
  {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+234 813 456 7890",
    email: "john.doe@example.com",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: "+234 802 345 6789",
    email: "jane.smith@example.com",
  },
  {
    firstName: "Emeka",
    lastName: "Johnson",
    phoneNumber: "+234 814 234 5678",
    email: "emeka.johnson@example.com",
  },
  {
    firstName: "Aisha",
    lastName: "Bello",
    phoneNumber: "+234 809 123 4567",
    email: "aisha.bello@example.com",
  },
  {
    firstName: "Chinedu",
    lastName: "Okafor",
    phoneNumber: "+234 817 654 3210",
    email: "chinedu.okafor@example.com",
  },
];

export const recentShipments = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    senderName: "Jane Smith",
    status: "approved",
  },
  {
    firstName: "Aisha",
    lastName: "Bello",
    email: "aisha.bello@example.com",
    senderName: "Emeka Johnson",
    status: "pending",
  },
  {
    firstName: "Chinedu",
    lastName: "Okafor",
    email: "chinedu.okafor@example.com",
    senderName: "Grace Ibekwe",
    status: "rejected",
  },
  {
    firstName: "Fatima",
    lastName: "Abdullahi",
    email: "fatima.abdullahi@example.com",
    senderName: "Ahmed Yusuf",
    status: "approved",
  },
  {
    firstName: "Tolu",
    lastName: "Oladele",
    email: "tolu.oladele@example.com",
    senderName: "Samuel Alabi",
    status: "pending",
  },
];

export const recentTransactions = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    transactionType: "deposit",
    amount: 5000,
    _id: 1,
  },
  {
    firstName: "Aisha",
    lastName: "Bello",
    email: "aisha.bello@example.com",
    transactionType: "withdraw",
    amount: 2000,
    _id: 2,
  },
  {
    firstName: "Chinedu",
    lastName: "Okafor",
    email: "chinedu.okafor@example.com",
    transactionType: "deposit",
    amount: 1500,
    _id: 3,
  },
  {
    firstName: "Fatima",
    lastName: "Abdullahi",
    email: "fatima.abdullahi@example.com",
    transactionType: "withdraw",
    amount: 800,
    _id: 4,
  },
  {
    firstName: "Tolu",
    lastName: "Oladele",
    email: "tolu.oladele@example.com",
    transactionType: "deposit",
    amount: 1200,
    _id: 5,
  },
];

export default function RecentEntities({
  data: { deliveriesResponse, customersResponse },
}: any) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <RecentEntityData
        data={customersResponse?.data?.data?.users}
        entity="customers"
      />
      <RecentEntityData
        data={deliveriesResponse?.data.data.delivery}
        entity="shipments"
      />
      <RecentEntityData data={recentTransactions} entity="transactions" />
    </div>
  );
}
