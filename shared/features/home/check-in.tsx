import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function CheckIn({ container_id, location }: $CheckInPayload) {
  const data = await axiosClient.put<$Geo>(
    `${ENDPOINTS.CHECK_IN.replaceAll(':id', container_id)}`,
    location
  );
  return data.data;
}
