import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/shared/instants/axios-client';
import { ENDPOINTS } from '@/shared/constants/endpoints';

type Props = { url: string };
export default function useGetImg({ url }: Props) {
  return useQuery({
    queryFn: async () => {
      const req = await axiosClient.get<$UrlImgResponse>(
        `${ENDPOINTS.CARRIER_PRESIGNED_URL_DOWNLOAD}${url}`
      );
      return req.data;
    },
    queryKey: ['CARRIER_PRESIGNED_URL_DOWNLOAD'],
  });
}
