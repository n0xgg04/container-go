import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export function Login(payload: $LoginPayload) {
  return axiosClient.post<
    $LoginPayload,
    {
      data: $LoginResponse;
    }
  >(ENDPOINTS.LOGIN, payload);
}
