import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { clearAllNotifications as clearAllNotificationsApi } from "../../_lib/actions";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useClearAllNotifications() {
  const [isCleared, setIsCleared] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: clearAllNotifications, isLoading: isClearing } = useMutation({
    mutationFn: clearAllNotificationsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("All notifications have been cleared.");
      setIsCleared(true);
    },
  });

  return { clearAllNotifications, isClearing, isCleared, setIsCleared };
}
