import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function ChangePassword(payload: $ChangePasswordPayload) {
  return axiosClient.post<$ChangePasswordPayload, $ChangePasswordResponse>(
    ENDPOINTS.CHANGE_PASSWORD,
    payload
  );
}
