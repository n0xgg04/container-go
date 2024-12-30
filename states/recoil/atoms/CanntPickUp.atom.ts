import { atom } from 'recoil';

export const CanntPickUpAtom = atom({
  key: 'CanntPickUpAtom',
  default: {
    reason: '',
    note: '',
  },
});
