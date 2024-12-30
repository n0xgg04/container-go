import { atom } from 'recoil';

export const AppOverlayAtom = atom({
  key: 'AppOverlayAtom',
  default: {
    isLoading: false,
  },
});
