import { atom } from 'recoil';

export enum PICK_STEP {
  CHECKIN = 'CHECKIN',
  RECEIVE_LOCATION = 'RECEIVE_LOCATION',
}

export const PickLocationAtom = atom<PickLocationT>({
  key: 'PickLocationAtom',
  default: {
    step: PICK_STEP.CHECKIN,
    container_id: '',
  },
});
