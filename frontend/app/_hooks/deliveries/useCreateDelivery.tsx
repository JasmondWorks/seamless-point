import { createDelivery as createDeliveryApi } from "@/app/_lib/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateDelivery() {
  const queryClient = useQueryClient();
  const {
    mutate: createDelivery,
    isLoading: isCreating,
    isError,
  } = useMutation({
    mutationFn: createDeliveryApi,
    onSuccess: () => {
      toast.success("Delivery created successfully");
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return { createDelivery, isCreating, isError };
}
