import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RejectPick } from '@/shared/features/pick/reject-pick';

export default function useRejectPickup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: $RejectPickupPayload) => {
      return RejectPick(variables);
    },
    mutationKey: ['REJECT_PICK_UP'],
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
