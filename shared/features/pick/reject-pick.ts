import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function RejectPick({
  container_id,
  message,
  reasonId,
}: $RejectPickupPayload) {
  const data = await axiosClient.post(
    `${ENDPOINTS.REJECT_PICK.replaceAll(':id', container_id)}`,
    {
      message,
      success: false,
      reasonId,
    }
  );
  return data.data;
}
