import { useQuery } from '@tanstack/react-query';
import { GetReasons } from '@/shared/features/pick/get-reasons';

type Props = {
  type: 'PICKUP' | 'DELIVERY';
};
export default function useGetReasons({ type }: Props) {
  return useQuery({
    queryFn: async () => {
      return GetReasons(type);
    },
    queryKey: ['GET_REASON', type],
    staleTime: Infinity,
  });
}
