import { markNotificationsAsRead as markNotificationsAsReadApi } from "@/app/_lib/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMarkNotificationsAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markNotificationsAsRead } = useMutation({
    mutationFn: (unreadNotificationIds: string[]) =>
      markNotificationsAsReadApi(unreadNotificationIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  return { markNotificationsAsRead };
}
