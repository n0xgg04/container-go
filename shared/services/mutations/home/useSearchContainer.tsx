import { axiosClient } from '@/shared/instants/axios-client';
import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '@/shared/constants/endpoints';
import { useUserData } from '@/states/recoil/atoms/AuthenticationAtom';
import { SummariesStatus } from '@/shared/constants/deliver_status.enum';
import React from 'react';

type Props = {
  to: string;
  from: string;
  pageNumber?: number;
  type: SummariesStatus;
};

export default function useSearchContainer({
  from,
  to,
  type,
  pageNumber,
}: Props) {
  const userData = useUserData();

  const shipment_completed = React.useMemo(() => {
    if (type === SummariesStatus.COMPLETED) {
      return 'true';
    }
    return 'false';
  }, [type]);

  const shipment_started = React.useMemo(() => {
    if (type === SummariesStatus.NOT_STARTED) {
      return 'false';
    }
    return 'true';
  }, [type]);

  return useMutation({
    mutationFn: async () => {
      const req = await axiosClient.post<
        any,
        {
          data: $SearchContainerResponse;
        }
      >(ENDPOINTS.SEARCH_CONTAINER, {
        query: `{"driver_id": UUID('${userData?.id}'),"planned_dropoff_date": {"$gte": {"$date": "${from}"},"$lte": {"$date": "${to}"}},"shipment_completed": { "$exists": ${shipment_completed} },"shipment_started": { "$exists": ${shipment_started} }}`,
        pageRequest: {
          pageNumber: pageNumber ? 0 : 0,
          pageSize: 20,
          sort: [
            //   {
            //     "direction": "<string>",
            //     "property": "<string>"
            //   },
            //   {
            //     "direction": "<string>",
            //     "property": "<string>"
            //   }
          ],
        },
      });
      return req.data;
    },
    mutationKey: ['SEARCH_CONTAINER', from, to],
  });
}
