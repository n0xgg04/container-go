import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export function PhoneLogin(payload: $PhoneLoginPayload) {
  return axiosClient.post<$PhoneLoginPayload, $PhoneLoginResponse>(
    ENDPOINTS.OTP,
    payload
  );
}
