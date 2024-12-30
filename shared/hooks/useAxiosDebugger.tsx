import useNetworkDevToolState from '@/states/hooks/useNetworkDevToolState';
import { axiosClient } from '@/shared/instants/axios-client';
import { useEffect } from 'react';
import { GUARD_INSTANT } from '@/shared/instants/auth-guard';

export const useAxiosDebugger = () => {
  const [requests, setRequests] = useNetworkDevToolState();

  useEffect(() => {
    axiosClient.interceptors.response.use(async function (response) {
      if (response.status === 401) {
        const ORIGIN_REQUEST = response.config;
        const { access_token } = await GUARD_INSTANT.refreshToken();
        ORIGIN_REQUEST.headers.Authorization = 'Bearer ' + access_token;
        return axiosClient(ORIGIN_REQUEST);
      }
      setRequests((pre) => [
        {
          url: response.config.url,
          payload: response.data,
          statusCode: response.status,
          response: response.data,
          method: response.config.method,
        },
        ...pre,
      ]);
      return response;
    });
  }, []);
};
