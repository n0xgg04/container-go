import { atom } from 'recoil';

export type TakePhotoStateT = {
  photos: string[];
};

export const TakePhotoStateAtom = atom<TakePhotoStateT>({
  key: 'TakePhotoStateAtom',
  default: {
    photos: [],
  },
});
