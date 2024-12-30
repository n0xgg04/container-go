import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export default function useDriverInfo() {
  return useQuery({
    queryFn: async function () {
      const req = await axiosClient.get<$DriverInfoResponse>(
        `${ENDPOINTS.DRIVER_INFO}`
      );
      return req.data;
    },
    queryKey: ['DRIVER_INFO'],
  });
}
