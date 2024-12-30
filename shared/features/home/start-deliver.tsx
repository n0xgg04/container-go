import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function StartDeliver({
  container_id,
}: $GetContainerDetailPayload) {
  const data = await axiosClient.put(
    `${ENDPOINTS.START_DELIVERY.replaceAll(':id', container_id)}`
  );
  return data.data;
}
