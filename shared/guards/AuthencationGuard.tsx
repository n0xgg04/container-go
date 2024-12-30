import { selector, useRecoilValue } from 'recoil';
import { AuthenticationAtom } from '@/states/recoil/atoms/AuthenticationAtom';

export const UserDataSelector = selector({
  key: 'UserDataSelector',
  get: ({ get }) => {
    const authenticationAtom = get(AuthenticationAtom);
    return {
      isLoggedIn: authenticationAtom.isLoggedIn,
      data: authenticationAtom.data,
    };
  },
});

export function useSession() {
  return useRecoilValue(UserDataSelector);
}

export function useIsLoggedIn() {
  const session = useSession();
  return session.isLoggedIn;
}
