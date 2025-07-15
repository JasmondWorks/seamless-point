import { useMutation } from "@tanstack/react-query";

export default function useCancelDelivery(trackingNumber: string) {
  const {
    mutate: cancelDelivery,
    isLoading,
    error,
  } = useMutation({
    // mutationFn: () => cancelDeli,
  });

  return { cancelDelivery, isLoading, error };
}
