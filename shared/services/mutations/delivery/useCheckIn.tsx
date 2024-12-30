import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckInDelivery } from '@/shared/features/delivery/check-in';

export default function useDeliveryCheckIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: $CheckInPayload) => {
      return CheckInDelivery(variables);
    },
    mutationKey: ['CHECK_IN_DELIVERY'],
    onSuccess: async (data, variables) => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ['CONTAINER_DETAIL', variables.container_id],
        }),
        queryClient.refetchQueries({ stale: true }),
      ]);
    },
  });
}
