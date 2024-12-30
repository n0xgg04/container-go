import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function SubmitPickup({
  container_id,
  signee,
  image_urls,
  message,
}: $SubmitPickupPayload) {
  const data = await axiosClient.post(
    `${ENDPOINTS.SUBMIT_PICKUP.replaceAll(':id', container_id)}`,
    {
      success: true,
      imageUrls: image_urls,
      signee,
      message,
    }
  );
  return data.data;
}
