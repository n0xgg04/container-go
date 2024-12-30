import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RejectDelivery } from '@/shared/features/delivery/reject-delivery';

export default function useRejectDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: $RejectPickupPayload) => {
      return RejectDelivery(variables);
    },
    mutationKey: ['REJECT_DELIVERY'],
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
