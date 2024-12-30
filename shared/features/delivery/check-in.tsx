import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function CheckInDelivery({
  container_id,
  location,
}: $CheckInPayload) {
  const data = await axiosClient.post<$Geo>(
    `${ENDPOINTS.CHECK_IN_DELIVERY.replaceAll(':id', container_id)}`,
    location
  );
  return data.data;
}
