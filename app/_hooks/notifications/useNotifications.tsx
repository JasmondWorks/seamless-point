import { fetchNotifications } from "@/app/_lib/actions";
import { useQuery } from "@tanstack/react-query";

export default function useNotifications() {
  const {
    data: notificationsResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(),
    refetchOnWindowFocus: true,
    // refetchInterval: 60000, // Poll every 5 seconds for new notifications
    staleTime: 5000, // Keep the data fresh for 5 seconds,
  });

  if (isError) {
    console.error("Error fetching notifications:", error);
  }

  return { notificationsResponse, isLoading, isError, refetch };
}
