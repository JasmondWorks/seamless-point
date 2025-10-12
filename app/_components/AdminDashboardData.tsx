"use client";

import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import RecentEntities from "@/app/_components/RecentEntities";
import StatsCards from "@/app/_components/StatsCards";
import {
  fetchLatestCustomers,
  fetchLatestDeliveries,
  fetchLatestTransactions,
  getUserById,
} from "@/app/_lib/actions";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export default function AdminDashboardData() {
  const [transactionsWithUser, setTransactionsWithUser] = useState<any[]>([]);

  const {
    data: deliveriesResponse,
    isLoading: isDeliveriesLoading,
    // isError,
  } = useQuery({
    queryKey: ["latest-deliveries"],
    queryFn: () => fetchLatestDeliveries(),
    refetchInterval: 60000, // Refetch every 60 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const deliveries = deliveriesResponse?.data?.data?.delivery ?? [];

  const {
    data: customersResponse,
    isLoading: isCustomersLoading,
    // isError,
  } = useQuery({
    queryKey: ["latest-customers"],
    queryFn: () => fetchLatestCustomers(),
    refetchInterval: 60000, // Refetch every 60 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const customers = customersResponse?.data?.data?.users ?? [];

  const {
    data: transactionsResponse,
    isLoading: isTransactionsLoading,
    // isError,
  } = useQuery({
    queryKey: ["latest-transactions"],
    queryFn: () => fetchLatestTransactions(),
    refetchInterval: 60000, // Refetch every 60 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const transactions = transactionsResponse?.data?.data?.transactions ?? [];

  useEffect(() => {
    const fetchTransactionsWithUser = async () => {
      if (transactions.length > 0) {
        const promises = transactions.map(async (t: any) => {
          const userRes = await getUserById(t.user);
          const userDetails = userRes?.user as any;

          console.log(userDetails);

          return {
            ...t,
            ...userDetails,
          };
        });
        const resolvedTransactions = await Promise.all(promises);
        setTransactionsWithUser(resolvedTransactions);
      } else {
        setTransactionsWithUser([]);
      }
    };

    fetchTransactionsWithUser();
  }, [transactions]);

  console.log(transactionsWithUser);

  const isLoading =
    isDeliveriesLoading || isCustomersLoading || isTransactionsLoading;

  if (isLoading) return <DataFetchSpinner />;

  return (
    <>
      <StatsCards data={{ customersResponse }} />
      <RecentEntities
        data={{ deliveries, customers, transactions: transactionsWithUser }}
      />
    </>
  );
}
