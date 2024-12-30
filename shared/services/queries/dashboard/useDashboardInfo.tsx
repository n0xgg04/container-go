import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export default function useDashboardInfo(from: string, to: string) {
  return useQuery({
    queryFn: async function () {
      const req = await axiosClient.get<$DashboardInfoResponse>(
        `${ENDPOINTS.CARRIER_DRIVER_STATISTICS_CONTAINER}?from=${from}&to=${to}`
      );
      return req.data;
    },
    queryKey: ['CARRIER_DRIVER_STATISTICS_CONTAINER', from, to],
  });
}
