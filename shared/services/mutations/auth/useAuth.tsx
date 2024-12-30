import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { AuthenticationAtom } from '@/states/recoil/atoms/AuthenticationAtom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '@/shared/constants/async-storage-key';
import { GUARD_INSTANT } from '@/shared/instants/auth-guard';

export default function useAuth() {
  const [state, setState] = useRecoilState(AuthenticationAtom);
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useMutation({
    mutationFn: GUARD_INSTANT.login,
    mutationKey: ['LOGIN'],
    onSuccess: async ({ isLoggedIn, access_token, data }) => {
      if (isLoggedIn && access_token) {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.GUARD, access_token);
        setState({
          isLoading: false,
          isLoggedIn: true,
          data,
          payload: {
            access_token: access_token,
            expire_at: '',
          },
        });
      }
    },
  });

  useEffect(() => {
    setState((pre) => ({ ...pre, isLoading: isPending }));
  }, [isPending, setState]);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.GUARD);
    queryClient.clear();
    setState({
      isLoading: false,
      isLoggedIn: false,
      data: {},
      payload: {
        access_token: '',
        expire_at: '',
      },
    });
  }, []);

  return { login, isPending, isSuccess, isError, reset, logout };
}
