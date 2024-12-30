import { atom } from 'recoil';

export const PODUploadedAtom = atom<{
  files: string[];
}>({
  key: 'PODUploadedAtom',
  default: {
    files: [],
  },
});
