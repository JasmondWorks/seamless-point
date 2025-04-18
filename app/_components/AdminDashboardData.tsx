"use client";

import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import RecentEntities from "@/app/_components/RecentEntities";
import StatsCards from "@/app/_components/StatsCards";
import {
  fetchLatestCustomers,
  fetchLatestDeliveries,
} from "@/app/_lib/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function AdminDashboardData() {
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

  const isLoading = isDeliveriesLoading || isCustomersLoading;

  if (isLoading) return <DataFetchSpinner />;

  return (
    <>
      <StatsCards data={{ customersResponse }} />
      <RecentEntities data={{ deliveriesResponse, customersResponse }} />
    </>
  );
}
