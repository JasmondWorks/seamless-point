import { fetchNotifications } from "@/app/_lib/actions";
import { useQuery } from "@tanstack/react-query";

export default function useNotifications() {
  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchOnWindowFocus: true,
    staleTime: 0, // Data will always be refetched on focus
  });

  if (isError) {
    console.error("Error fetching notifications:", error);
  }

  console.log(notifications);
  return { notifications, isLoading, isError };
}
