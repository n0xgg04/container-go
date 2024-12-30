import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export function getUserinfo() {
  return axiosClient.get<$MeResponse>(ENDPOINTS.ME);
}
