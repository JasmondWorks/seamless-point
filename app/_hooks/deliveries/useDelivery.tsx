import { fetchDelivery } from "@/app/_lib/actions";
import { useQuery } from "@tanstack/react-query";

function useDelivery(id: string) {
  const {
    data: delivery,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["delivery", id],
    queryFn: () => fetchDelivery(id),
    refetchInterval: 60000, // Refetch every 60 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  console.log(delivery);

  return { delivery, isLoading, isError };
}

export default useDelivery;
