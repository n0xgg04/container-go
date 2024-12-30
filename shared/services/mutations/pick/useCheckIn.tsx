import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckIn } from '@/shared/features/home/check-in';

export default function useCheckIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: $CheckInPayload) => {
      return CheckIn(variables);
    },
    mutationKey: ['CHECK_IN'],
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
