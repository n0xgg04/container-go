import { atom } from 'recoil';

export enum PICK_STEP {
  CHECKIN = 'CHECKIN',
  RECEIVE_LOCATION = 'RECEIVE_LOCATION',
}

export const DeliveryLocationAtom = atom<PickLocationT>({
  key: 'DeliveryLocationAtom',
  default: {
    step: PICK_STEP.CHECKIN,
    container_id: '',
  },
});
