import { atom } from 'recoil';

type PODAtomT = {
  file: {
    name: string;
    path: string;
  }[];
};

export const PODAtom = atom<PODAtomT>({
  key: 'PODAtom',
  default: {
    file: [
      {
        name: '',
        path: '',
      },
    ],
  },
});
