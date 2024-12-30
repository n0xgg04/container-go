import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export function ForgotPassword(payload: $ForgotPasswordPayload) {
  return axiosClient.post<
    $ForgotPasswordPayload,
    {
      data: $ForgotPasswordResponse;
    }
  >(ENDPOINTS.FORGOT_PASSWORD, payload);
}
