//?fileType=POD&fileName=pod.png

import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

export async function UploadS3(fileType: $FileType, fileName: string) {
  const data = await axiosClient.get<{
    url: string;
    filePath: string;
  }>(`${ENDPOINTS.UPLOAD_S3}?fileType=${fileType}&fileName=${fileName}`);
  return data.data;
}
