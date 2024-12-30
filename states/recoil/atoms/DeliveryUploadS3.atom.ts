import { atom } from 'recoil';

export const DeliveryUploadS3Atom = atom<{
  photos: string[];
}>({
  key: 'DeliveryUploadS3Atom',
  default: {
    photos: [],
  },
});
