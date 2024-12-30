import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitDelivery } from '@/shared/features/delivery/submit-delivery';
import moment from 'moment';

export default function useSubmitDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: $SubmitDeliveryPayload) => {
      return SubmitDelivery({
        ...variables,
        deliveryTime: moment(variables.deliveryTime)
          .utc()
          .format('YYYY-MM-DDTHH:mm:ss[Z]'),
      });
    },
    mutationKey: ['SUBMIT_DELIVERY_UP'],
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
