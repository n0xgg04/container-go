import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

type Props = { from: string; to: string };
export default function useGetDashboardInfoByDate({ from, to }: Props) {
  return useQuery({
    queryFn: async () => {
      const req = await axiosClient.get<$DashboardInfoResponse>(
        `${ENDPOINTS.CARRIER_DRIVER_STATISTICS_CONTAINER}?from=${from}&to=${to}`
      );
      return req.data;
    },
    staleTime: Infinity,
    queryKey: ['GET_DASHBOARD_INFO', from, to],
  });
}
