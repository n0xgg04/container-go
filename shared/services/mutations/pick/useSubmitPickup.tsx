import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitPickup } from '@/shared/features/home/submit-pickup';

export default function useSubmitPickup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: $SubmitPickupPayload) => {
      return SubmitPickup(variables);
    },
    mutationKey: ['SUBMIT_PICK_UP'],
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
