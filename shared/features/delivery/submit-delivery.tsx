import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function SubmitDelivery({
  container_id,
  signee,
  image_urls,
  message,
  deliveryTime,
  receiver_name,
}: $SubmitDeliveryPayload) {
  const data = await axiosClient.post(
    `${ENDPOINTS.DELIVERY_SUBMIT.replaceAll(':id', container_id)}`,
    {
      success: true,
      imageUrls: image_urls,
      recipientName: receiver_name,
      deliveryTime,
      signee,
      message,
    }
  );
  return data.data;
}
