import { atom, selector, useRecoilValue } from 'recoil';

export const AuthenticationAtom = atom<AuthenticationAtom>({
  key: 'AuthenticationAtom',
  default: {
    isLoading: true,
    isLoggedIn: true,
    data: {},
    payload: {
      access_token: '',
      expire_at: '',
    },
  },
});

const userDataSelector = selector({
  key: 'UserData',
  get: ({ get }) => {
    const authenticationAtom = get(AuthenticationAtom);
    return authenticationAtom.data;
  },
});

export const useUserData = () => {
  return useRecoilValue(userDataSelector);
};
