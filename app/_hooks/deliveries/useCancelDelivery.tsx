import { useMutation } from "@tanstack/react-query";

export default function useCancelDelivery() {
  const {
    mutate: cancelDelivery,
    isLoading: isCancelling,
    error,
  } = useMutation({
    mutationFn: () => function () {},
  });

  return { cancelDelivery, isCancelling };
}
