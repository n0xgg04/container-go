import { useQuery } from '@tanstack/react-query';
import { GetContainerDetail } from '@/shared/features/home/get-container-detail';

type Props = {
  container_id: string;
};
export default function useContainerDetail({ container_id }: Props) {
  return useQuery({
    queryFn: async () => {
      if (!container_id) {
        return Promise.resolve(null);
      }
      return GetContainerDetail({ container_id });
    },
    staleTime: Infinity,
    queryKey: ['CONTAINER_DETAIL', container_id],
  });
}
