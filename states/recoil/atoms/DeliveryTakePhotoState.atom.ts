import { atom } from 'recoil';

export type DeliveryTakePhotoAtom = {
  photos: string[];
};

export const DeliveryTakePhotoAtom = atom<DeliveryTakePhotoAtom>({
  key: 'DeliveryTakePhotoAtom',
  default: {
    photos: [],
  },
});
