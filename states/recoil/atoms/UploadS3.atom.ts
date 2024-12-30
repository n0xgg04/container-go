import { atom } from 'recoil';

export const UploadS3Atom = atom<{
  photos: string[];
}>({
  key: 'UploadS3Atom',
  default: {
    photos: [],
  },
});
