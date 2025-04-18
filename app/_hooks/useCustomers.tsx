"use client";

import { fetchAllCustomers, fetchDeliveries } from "@/app/_lib/actions";
import { useQuery } from "@tanstack/react-query";

function useCustomers(page?: number, limit?: number, sort?: string) {
  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customers", page],
    queryFn: () => fetchAllCustomers({ page, limit, sort }),
    refetchInterval: 60000, // Refetch every 60 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  console.log(customers);

  return { customers, isLoading, isError };
}

export default useCustomers;
