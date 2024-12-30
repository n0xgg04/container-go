import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function FinishDelivery({ container_id, pod }: $FinishPayload) {
  const data = await axiosClient.put(
    `${ENDPOINTS.SHIPMENT_SUBMIT.replaceAll(':id', container_id)}`,
    {
      podFiles: pod,
    }
  );
  return data.data;
}
