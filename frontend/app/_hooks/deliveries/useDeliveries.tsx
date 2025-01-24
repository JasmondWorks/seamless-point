import { fetchDeliveries } from "@/app/_lib/actions";
import { useQuery } from "@tanstack/react-query";

function useDeliveries(page: number, limit: number, sort: string) {
  const {
    data: deliveries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deliveries", page],
    queryFn: () => fetchDeliveries({ page, limit, sort }),
    refetchInterval: 60000, // Refetch every 60 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  console.log(deliveries);

  return { deliveries, isLoading, isError };
}

export default useDeliveries;
