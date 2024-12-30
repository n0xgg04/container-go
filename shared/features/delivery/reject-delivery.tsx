import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function RejectDelivery({
  container_id,
  message,
  reasonId,
}: $RejectPickupPayload) {
  const data = await axiosClient.post(
    `${ENDPOINTS.REJECT_DELIVERY.replaceAll(':id', container_id)}`,
    {
      message,
      success: false,
      reasonFailureId: reasonId,
    }
  );
  return data.data;
}
