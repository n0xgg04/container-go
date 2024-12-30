import { useEffect } from 'react';
import { ASYNC_STORAGE_KEYS } from '@/shared/constants/async-storage-key';
import { useRecoilState } from 'recoil';
import { AuthenticationAtom } from '@/states/recoil/atoms/AuthenticationAtom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserinfo } from '@/shared/features/auth/get-userinfo';
import { GUARD_INSTANT } from '@/shared/instants/auth-guard';

export default function useGuardLoader() {
  const [state, setState] = useRecoilState(AuthenticationAtom);
  useEffect(() => {
    (async function () {
      const ACCESS_TOKEN = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.GUARD);
      if (ACCESS_TOKEN) {
        const { isValid, data, expire_at } =
          await GUARD_INSTANT.checkSessionIsValid(ACCESS_TOKEN);
        if (isValid) {
          const { data } = await getUserinfo();
          setState({
            isLoading: false,
            isLoggedIn: true,
            data,
            payload: {
              access_token: ACCESS_TOKEN,
              expire_at,
            },
          });
          return;
        }
      }
      setState({
        isLoading: false,
        isLoggedIn: false,
        data: undefined,
        payload: {},
      });
    })();
  }, [setState]);
}
