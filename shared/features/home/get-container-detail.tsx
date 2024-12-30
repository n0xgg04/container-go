import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function GetContainerDetail({
  container_id,
}: $GetContainerDetailPayload) {
  const data = await axiosClient.get<$GetContainerDetailResponse>(
    `${ENDPOINTS.CONTAINER_DETAIL}/${container_id}`
  );
  return data.data;
}
