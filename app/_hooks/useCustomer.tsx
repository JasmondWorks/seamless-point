"use client";

import { fetchCustomer } from "@/app/_lib/actions";
import { useQuery } from "@tanstack/react-query";

function useCustomer(id: string) {
  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customers", id],
    queryFn: () => fetchCustomer(id),
    refetchInterval: 60000, // Refetch every 60 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  console.log(customer);

  return { customer: customer?.data?.user, isLoading, isError };
}

export default useCustomer;
