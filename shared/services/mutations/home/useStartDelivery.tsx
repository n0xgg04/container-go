import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StartDeliver } from '@/shared/features/home/start-deliver';

type Props = {
  container_id: string;
};
export default function useStartDelivery({ container_id }: Props) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return StartDeliver({ container_id });
    },
    mutationKey: ['START_DELIVERY', container_id],
    onSuccess: async () => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ['CONTAINER_DETAIL', container_id],
        }),
        queryClient.refetchQueries({ stale: true }),
      ]);
    },
  });
}
