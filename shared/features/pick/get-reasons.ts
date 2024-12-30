import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function GetReasons(type: 'PICKUP' | 'DELIVERY') {
  const data = await axiosClient.get<
    {
      id: string;
      name: string;
    }[]
  >(`${ENDPOINTS.GET_REASONS}?type=${type}`);
  return data.data;
}
