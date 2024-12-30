import { atom } from 'recoil';

export const FilterDateAtom = atom({
  key: 'FilterDateAtom',
  default: {
    fromDate: '',
    toDate: '',
  },
});
