import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FinishDelivery } from '@/shared/features/delivery/finish-delivery';

export default function useFinishShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: $FinishPayload) => {
      return FinishDelivery(variables);
    },
    mutationKey: ['FINISH_SHIPMENT'],
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
