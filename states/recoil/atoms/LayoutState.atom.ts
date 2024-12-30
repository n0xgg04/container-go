import { atom } from 'recoil';

export const LayoutStateAtom = atom({
  key: 'LayoutStateAtom',
  default: {
    topBarHeight: 10,
  },
});
